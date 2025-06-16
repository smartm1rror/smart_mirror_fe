"use client";
import { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import * as handpose from '@tensorflow-models/handpose';
import Webcam from 'react-webcam';

const SETTINGS = {
    CONFIDENCE_THRESHOLD: 0.75,
    PALM_BASE_POINTS: [0, 5, 9, 13, 17], // 손바닥 기준점
    FINGER_TIPS: [4, 8, 12, 16, 20],     // 손가락 끝점
    MIN_PALM_SIZE: 40,                    // 최소 손바닥 크기
    MAX_PALM_SIZE: 200,                   // 최대 손바닥 크기
    MIN_FINGER_SPREAD: 25,                // 손가락 사이 최소 거리
    POINT_SIZE: 5,
    LINE_WIDTH: 2,
};

const HandDrawingOnly = () => {
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [handposeModel, setHandposeModel] = useState<any>(null);

    // 두 점 사이의 거리 계산
    const getDistance = (point1: number[], point2: number[]) => {
        return Math.sqrt(
            Math.pow(point1[0] - point2[0], 2) + 
            Math.pow(point1[1] - point2[1], 2)
        );
    };

    // 손바닥 크기 계산
    const getPalmSize = (landmarks: number[][]) => {
        const palmPoints = SETTINGS.PALM_BASE_POINTS.map(i => landmarks[i]);
        let maxDistance = 0;
        
        for (let i = 0; i < palmPoints.length; i++) {
            for (let j = i + 1; j < palmPoints.length; j++) {
                const distance = getDistance(palmPoints[i], palmPoints[j]);
                maxDistance = Math.max(maxDistance, distance);
            }
        }
        
        return maxDistance;
    };

    // 손가락이 충분히 벌어져 있는지 확인
    const areFingersSpreads = (landmarks: number[][]) => {
        const fingerTips = SETTINGS.FINGER_TIPS.map(i => landmarks[i]);
        let spreadFingers = 0;

        for (let i = 0; i < fingerTips.length - 1; i++) {
            const distance = getDistance(fingerTips[i], fingerTips[i + 1]);
            if (distance > SETTINGS.MIN_FINGER_SPREAD) {
                spreadFingers++;
            }
        }

        return spreadFingers >= 3; // 최소 3개의 손가락이 충분히 벌어져 있어야 함
    };

    // 손 모양이 유효한지 검증
    const isValidHand = (prediction: any) => {
        const landmarks = prediction.landmarks;
        const palmSize = getPalmSize(landmarks);
        const fingersSpread = areFingersSpreads(landmarks);

        return (
            prediction.handInViewConfidence > SETTINGS.CONFIDENCE_THRESHOLD &&
            palmSize > SETTINGS.MIN_PALM_SIZE &&
            palmSize < SETTINGS.MAX_PALM_SIZE &&
            fingersSpread
        );
    };

    const drawHand = (prediction: any, ctx: CanvasRenderingContext2D) => {
        const landmarks = prediction.landmarks;

        // Draw palm
        ctx.beginPath();
        ctx.moveTo(landmarks[0][0], landmarks[0][1]);
        SETTINGS.PALM_BASE_POINTS.forEach(point => {
            ctx.lineTo(landmarks[point][0], landmarks[point][1]);
        });
        ctx.closePath();
        ctx.strokeStyle = "rgba(0, 255, 0, 0.5)";
        ctx.lineWidth = SETTINGS.LINE_WIDTH;
        ctx.stroke();

        // Draw fingers
        const fingers = [
            [1, 2, 3, 4],        // 엄지
            [5, 6, 7, 8],        // 검지
            [9, 10, 11, 12],     // 중지
            [13, 14, 15, 16],    // 약지
            [17, 18, 19, 20]     // 소지
        ];

        fingers.forEach(finger => {
            ctx.beginPath();
            ctx.moveTo(landmarks[finger[0]][0], landmarks[finger[0]][1]);
            finger.forEach(point => {
                ctx.lineTo(landmarks[point][0], landmarks[point][1]);
            });
            ctx.strokeStyle = "blue";
            ctx.lineWidth = SETTINGS.LINE_WIDTH;
            ctx.stroke();
        });

        // Draw points
        landmarks.forEach((point: number[]) => {
            ctx.beginPath();
            ctx.arc(point[0], point[1], SETTINGS.POINT_SIZE, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
        });
    };

    const detect = async () => {
        if (!handposeModel || !webcamRef.current || !canvasRef.current) return;

        const video = webcamRef.current.video;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (video && ctx) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const predictions = await handposeModel.estimateHands(video);
            
            const validHands = predictions.filter(isValidHand);
            
            if (validHands.length > 0) {
                validHands.forEach((hand: any) => drawHand(hand, ctx));
            }
        }

        requestAnimationFrame(detect);
    };

    useEffect(() => {
        const loadModel = async () => {
            try {
                if (!tf.getBackend()) {
                    await tf.ready();
                    await tf.setBackend('webgl');
                }
                const model = await handpose.load();
                setHandposeModel(model);
            } catch (err) {
                console.error('모델 로딩 실패', err);
            }
        };
        loadModel();
    }, []);

    useEffect(() => {
        if (handposeModel) {
            detect();
        }
    }, [handposeModel]);

    return (
        <div className="p-4">
            <div className="relative w-[640px] h-[480px]">
                <Webcam
                    ref={webcamRef}
                    videoConstraints={{
                        facingMode: 'user',
                        width: 640,
                        height: 480,
                    }}
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                    }}
                />
                <canvas
                    ref={canvasRef}
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                    }}
                />
            </div>
        </div>
    );
};

export default HandDrawingOnly;
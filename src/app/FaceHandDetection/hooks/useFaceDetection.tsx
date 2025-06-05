"use client";

import React, { useRef, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import { useInference } from '../context/InferenceContext';

const FaceDetectionHiddenCamera: React.FC = () => {
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const {faceDetected, setFaceDetected} = useInference();

    const detectFace = useCallback(() => {
        if (!webcamRef.current || !canvasRef.current) return;

        const video = webcamRef.current.video;
        const canvas = canvasRef.current;

        if (video && video.readyState === 4) {
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const sampleSize = 120;  // 인식 범위 확장

            try {
                const imageData = ctx.getImageData(
                    centerX - sampleSize / 2,
                    centerY - sampleSize / 2,
                    sampleSize,
                    sampleSize
                );

                let skinPixels = 0;
                for (let i = 0; i < imageData.data.length; i += 4) {
                    const r = imageData.data[i];
                    const g = imageData.data[i + 1];
                    const b = imageData.data[i + 2];

                    if (r > 95 && g > 40 && b > 20 &&
                        r > g && r > b &&
                        Math.abs(r - g) > 15) {
                        skinPixels++;
                    }
                }

                const skinRatio = skinPixels / (sampleSize * sampleSize);
                const hasFace = skinRatio > 0.3;

                setFaceDetected(hasFace);
            } catch (error) {
                console.error('얼굴 감지 오류:', error);
            }
        }
    }, [setFaceDetected]);

    useEffect(() => {
        const detectInterval = setInterval(detectFace, 300);
        return () => clearInterval(detectInterval);
    }, [detectFace]);

    return (
        <div>
            {/* 카메라 영상은 숨김 */}
            <Webcam
                ref={webcamRef}
                audio={false}
                width={640}
                height={480}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                    width: 640,
                    height: 480,
                    facingMode: "user"
                }}
                style={{
                    opacity: 0,
                    pointerEvents: "none",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: 640,
                    height: 480,
                    zIndex: -1
                }}
            />


            <canvas
                ref={canvasRef}
                style={{ display: 'none' }}
            />

            {/* 좌측 상단 얼굴 인식 상태 알림 */}
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg flex items-center space-x-2 z-50">
                {faceDetected ? (
                    <>
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span>사용자</span>
                    </>
                ) : (
                    <>
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span>사용자</span>
                    </>
                )}
            </div>
        </div>
    );
};

export default FaceDetectionHiddenCamera;

"use client";
// components/FaceHandDetection.tsx

import React, { useRef, useEffect, useState } from 'react';
import { Hands } from '@mediapipe/hands';
import { FaceDetection } from '@mediapipe/face_detection';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { HAND_CONNECTIONS } from '@mediapipe/hands';

interface DetectionState {
  faceDetected: boolean;
  handGesture: string;
  faceCount: number;
  handCount: number;
}

const FaceHandDetection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [detectionState, setDetectionState] = useState<DetectionState>({
    faceDetected: false,
    handGesture: '',
    faceCount: 0,
    handCount: 0,
  });

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      }
    });

    const faceDetection = new FaceDetection({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`;
      }
    });

    // 손 감지 설정
    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    // 얼굴 감지 설정
    faceDetection.setOptions({
      minDetectionConfidence: 0.5
    });

    // 손 감지 결과 처리
    hands.onResults((results) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

      if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
          // 손 랜드마크 그리기
          drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {
            color: '#00FF00',
            lineWidth: 2
          });
          drawLandmarks(ctx, landmarks, {
            color: '#FF0000',
            lineWidth: 1
          });

          // 제스처 인식
          const gesture = recognizeGesture(landmarks);
          setDetectionState(prev => ({
            ...prev,
            handGesture: gesture,
            handCount: results.multiHandLandmarks.length
          }));
        }
      }
      ctx.restore();
    });

    // 얼굴 감지 결과 처리
    faceDetection.onResults((results) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      ctx.save();
      if (results.detections) {
        for (const detection of results.detections) {
          // 얼굴 주변에 박스 그리기
          const bbox = detection.boundingBox;
          ctx.strokeStyle = '#0000FF';
          ctx.lineWidth = 2;
          ctx.strokeRect(
            bbox.xCenter * canvas.width - (bbox.width * canvas.width) / 2,
            bbox.yCenter * canvas.height - (bbox.height * canvas.height) / 2,
            bbox.width * canvas.width,
            bbox.height * canvas.height
          );
        }
        setDetectionState(prev => ({
          ...prev,
          faceDetected: results.detections.length > 0,
          faceCount: results.detections.length
        }));
      }
      ctx.restore();
    });

    // 카메라 설정
    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        if (videoRef.current) {
          await hands.send({ image: videoRef.current });
          await faceDetection.send({ image: videoRef.current });
        }
      },
      width: 1280,
      height: 720
    });

    camera.start();

    return () => {
      camera.stop();
    };
  }, []);

  // 제스처 인식 함수
  const recognizeGesture = (landmarks: any[]) => {
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    const middleTip = landmarks[12];
    const ringTip = landmarks[16];
    const pinkyTip = landmarks[20];

    const thumbBase = landmarks[2];
    const indexBase = landmarks[5];
    const middleBase = landmarks[9];
    const ringBase = landmarks[13];
    const pinkyBase = landmarks[17];

    // 손가락이 펴져있는지 확인
    const isFingerExtended = (tip: any, base: any) => {
      return tip.y < base.y;
    };

    // 제스처 판단
    if (isFingerExtended(indexTip, indexBase) && 
        isFingerExtended(middleTip, middleBase) &&
        !isFingerExtended(ringTip, ringBase) &&
        !isFingerExtended(pinkyTip, pinkyBase)) {
      return "평화 ✌️";
    }

    if (isFingerExtended(indexTip, indexBase) && 
        !isFingerExtended(middleTip, middleBase) &&
        !isFingerExtended(ringTip, ringBase) &&
        !isFingerExtended(pinkyTip, pinkyBase)) {
      return "검지 들기 ☝️";
    }

    if (thumbTip.y < thumbBase.y && 
        !isFingerExtended(indexTip, indexBase) &&
        !isFingerExtended(middleTip, middleBase) &&
        !isFingerExtended(ringTip, ringBase) &&
        !isFingerExtended(pinkyTip, pinkyBase)) {
      return "엄지 척 👍";
    }

    return "인식된 제스처 없음";
  };

  return (
    <div className="detection-container">
      <video
        ref={videoRef}
        style={{ display: 'none' }}
      />
      <canvas
        ref={canvasRef}
        width={1280}
        height={720}
        style={{ 
          maxWidth: '100%',
          maxHeight: '80vh'
        }}
      />
      <div className="detection-info">
        <h3>감지 정보</h3>
        <p>얼굴 감지: {detectionState.faceDetected ? '감지됨' : '감지되지 않음'}</p>
        <p>감지된 얼굴 수: {detectionState.faceCount}</p>
        <p>감지된 손 수: {detectionState.handCount}</p>
        <p>인식된 제스처: {detectionState.handGesture}</p>
      </div>

      <style jsx>{`
        .detection-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          padding: 20px;
        }

        .detection-info {
          background-color: #f5f5f5;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .detection-info h3 {
          margin-top: 0;
          color: #333;
        }

        .detection-info p {
          margin: 8px 0;
          color: #666;
        }
      `}</style>
    </div>
  );
};

export default FaceHandDetection;
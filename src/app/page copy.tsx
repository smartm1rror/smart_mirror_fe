// src/app/components/FaceHandDetection/page.tsx
"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";

interface FaceDetectionCameraProps {
  onScreenshotTaken?: (imageSrc: string) => void;
}

const FaceDetectionCamera: React.FC<FaceDetectionCameraProps> = ({
  onScreenshotTaken
}) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCountingDown, setIsCountingDown] = useState(false);

  const countdownRef = useRef(0);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const takeScreenshot = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setCapturedImage(imageSrc);
        onScreenshotTaken?.(imageSrc);
        console.log('스크린샷 촬영 완료');
      }
    }
  }, [onScreenshotTaken]);

  const startCountdown = useCallback(() => {
    if (isCountingDown) return;

    let count = 3;
    setIsCountingDown(true);
    setCountdown(count);

    const timer = setInterval(() => {
      count--;
      setCountdown(count);
      console.log('카운트다운:', count);

      if (count <= 0) {
        clearInterval(timer);
        setIsCountingDown(false);
        takeScreenshot();
        setFaceDetected(false);
      }
    }, 1000);

    // 안전장치: 10초 후에는 강제로 타이머 정리
    setTimeout(() => {
      clearInterval(timer);
      if (isCountingDown) {
        setIsCountingDown(false);
        setCountdown(0);
      }
    }, 10000);

    return () => clearInterval(timer);
  }, [isCountingDown, takeScreenshot]);

  const resetCountdown = useCallback(() => {
    console.log('카운트다운 리셋');
    setCountdown(0);
    setIsCountingDown(false);
    countdownRef.current = 0;
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  }, []);
  const detectFace = useCallback(() => {
    if (!webcamRef.current || !canvasRef.current || isCountingDown) return;

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
      const sampleSize = 50;

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

        if (hasFace && !faceDetected && !isCountingDown) {
          setFaceDetected(true);
          startCountdown();
        } else if (!hasFace && !isCountingDown) {
          setFaceDetected(false);
        }
      } catch (error) {
        console.error('얼굴 감지 오류:', error);
      }
    }
  }, [faceDetected, isCountingDown, startCountdown]);
  
  useEffect(() => {
    let detectInterval: NodeJS.Timeout;

    const startDetection = () => {
      setIsLoading(false);
      detectInterval = setInterval(detectFace, 300);
    };

    startDetection();

    return () => {
      if (detectInterval) {
        clearInterval(detectInterval);
      }
    };
  }, [detectFace]);

  const retakePhoto = () => {
    setCapturedImage(null);
    setFaceDetected(false);
    setCountdown(0);
    setIsCountingDown(false);
    countdownRef.current = 0;
    resetCountdown();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">카메라를 준비하는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {!capturedImage ? (
          <div className="relative">
            <Webcam
              ref={webcamRef}
              audio={false}
              height={480}
              width={640}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                width: 640,
                height: 480,
                facingMode: "user"
              }}
              className="w-full h-auto"
            />

            <canvas
              ref={canvasRef}
              style={{ display: 'none' }}
            />

            <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg">
              {isCountingDown ? (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span>촬영 준비 중...</span>
                  <span className="ml-2 text-xl font-bold text-yellow-400">
                    {countdown}
                  </span>
                </div>
              ) : faceDetected ? (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span>얼굴 인식됨</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>얼굴을 카메라 중앙에 맞춰주세요</span>
                </div>
              )}
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-32 h-32 border-2 border-white border-dashed rounded-full opacity-50"></div>
            </div>

            {countdown > 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black bg-opacity-50 text-white text-6xl font-bold rounded-full w-32 h-32 flex items-center justify-center animate-pulse">
                  {countdown}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <img
              src={capturedImage}
              alt="촬영된 사진"
              className="w-full h-auto rounded-lg mb-4"
            />
            <button
              onClick={retakePhoto}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              다시 촬영하기
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 text-center text-gray-600">
        <p className="text-sm">
          📸 얼굴을 중앙 원 안에 맞추면 3초 후 자동으로 사진이 촬영됩니다
        </p>
        <p className="text-xs mt-2 text-gray-500">
          * 간단한 색상 기반 얼굴 감지를 사용합니다
        </p>
      </div>
    </div>
  );
};

export default FaceDetectionCamera;
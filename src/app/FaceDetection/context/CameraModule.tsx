import React, { useRef, useImperativeHandle, forwardRef } from "react";
import Webcam from "react-webcam";

const CAMERA_WIDTH = 1920;
const CAMERA_HEIGHT = 1440;

interface CameraModuleProps {
  onCapture: (blob: Blob) => void;
}

const CameraModule = forwardRef<{ capture: () => void }, CameraModuleProps>(
  ({ onCapture }, ref) => {
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useImperativeHandle(ref, () => ({
      capture: () => {
        const video = webcamRef.current?.video;
        const canvas = canvasRef.current;
        if (video && canvas) {
          canvas.width = CAMERA_WIDTH;
          canvas.height = CAMERA_HEIGHT;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(video, 0, 0, CAMERA_WIDTH, CAMERA_HEIGHT);
            canvas.toBlob((blob) => {
              if (blob) onCapture(blob);
            }, "image/jpeg", 0.95);
          }
        }
      }
    }));

    return (
      <>
        <Webcam
          ref={webcamRef}
          audio={false}
          width={CAMERA_WIDTH}
          height={CAMERA_HEIGHT}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            width: CAMERA_WIDTH,
            height: CAMERA_HEIGHT,
            facingMode: "user",
          }}
          style={{
            width: 1,
            height: 1,
            opacity: 1,
            position: "fixed",
            top: 0,
            left: 0,
            pointerEvents: "none",
            zIndex: -1,
          }}
        />
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </>
    );
  }
);

// displayName 추가
CameraModule.displayName = 'CameraModule';

export default CameraModule;
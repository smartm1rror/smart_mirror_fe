"use client";

import React, { createContext, useContext, useRef, useState, useCallback } from "react";
import CameraModule from "./CameraModule";

// 타입 정의
interface InferenceContextType {
  loading: boolean;
  error: string | null;
  result: any;
  captureAndInfer: () => void;
  faceDetected: boolean;
  setFaceDetected: React.Dispatch<React.SetStateAction<boolean>>;
}

const InferenceContext = createContext<InferenceContextType | undefined>(undefined);

export const InferenceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [faceDetected, setFaceDetected] = useState(false);

  // CameraModule의 capture 메서드를 ref로 노출
  const cameraRef = useRef<{ capture: () => void }>(null);

  // CameraModule에서 캡처된 이미지를 받으면 백엔드로 전송
  const handleCapture = useCallback(async (blob: Blob) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("image", blob, "capture.jpg");
      const res = await fetch("/api/infer", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("서버 오류");
      const data = await res.json();
      setResult(data);
    } catch (e: any) {
      setError(e.message || "알 수 없는 오류");
    } finally {
      setLoading(false);
    }
  }, []);

  // 외부에서 호출: 카메라 캡처에서 handleCapture로 전달
  const captureAndInfer = useCallback(() => {
    cameraRef.current?.capture();
  }, []);

  return (
    <InferenceContext.Provider value={{
      loading,
      error,
      result,
      captureAndInfer,
      faceDetected,
      setFaceDetected
    }}>
      {children}
      {/* CameraModule은 화면에 보이지 않게 렌더 */}
      <CameraModule
        ref={cameraRef}
        onCapture={handleCapture}
      />
    </InferenceContext.Provider>
  );
};

export const useInference = () => {
  const ctx = useContext(InferenceContext);
  if (!ctx) throw new Error("useInference must be used within InferenceProvider");
  return ctx;
};

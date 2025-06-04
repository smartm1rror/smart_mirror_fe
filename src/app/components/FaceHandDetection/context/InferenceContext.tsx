"use client";

import React, { createContext, useContext, useRef, useState, useCallback } from "react";
import CameraModule from "./CameraModule";

// 결과 데이터의 타입 정의
interface InferenceResult {
  // 실제 결과 데이터의 구조에 맞게 정의
  // 예시:
  success: boolean;
  data?: {
    prediction?: string;
    confidence?: number;
  };
  message?: string;
}

// 타입 정의
interface InferenceContextType {
  loading: boolean;
  error: string | null;
  result: InferenceResult | null;  // any 대신 구체적인 타입 사용
  captureAndInfer: () => void;
  faceDetected: boolean;
  setFaceDetected: React.Dispatch<React.SetStateAction<boolean>>;
}

const InferenceContext = createContext<InferenceContextType | undefined>(undefined);

export const InferenceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InferenceResult | null>(null);
  const [faceDetected, setFaceDetected] = useState(false);

  const cameraRef = useRef<{ capture: () => void }>(null);

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
      const data: InferenceResult = await res.json();  // 응답 타입 지정
      setResult(data);
    } catch (error: unknown) {  // any 대신 unknown 사용
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

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
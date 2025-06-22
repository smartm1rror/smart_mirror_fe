"use client";

import React, { createContext, useContext, useRef, useState, useCallback } from "react";
import CameraModule from "./CameraModule";
import { InferenceContextType } from "../types";
import { useInferenceHandler } from "../hooks/useInferenceHandler";

const InferenceContext = createContext<InferenceContextType | undefined>(undefined);

export const InferenceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading, error, result, handleCapture, sendAllImages } = useInferenceHandler();
  const [faceDetected, setFaceDetected] = useState(false);
  const [aiPreprocessing, setAiPreprocessing] = useState(false);
  const cameraRef = useRef<{ capture: () => void }>(null);

  // 미리보기 상태
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleCaptureWithPreview = useCallback((blob: Blob) => {
    handleCapture(blob);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
  }, [handleCapture, previewUrl]);

  const captureAndInfer = useCallback(() => {
    cameraRef.current?.capture();
  }, []);

  const value: InferenceContextType = {
    loading,
    error,
    result,
    captureAndInfer,
    faceDetected,
    setFaceDetected,
    aiPreprocessing,
    setAiPreprocessing,
    sendAllImages,
  };

  return (
    <InferenceContext.Provider value={value}>
      {children}
      <CameraModule
        ref={cameraRef}
        onCapture={handleCaptureWithPreview}
      />
      {previewUrl && (
        <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999, background: "#fff", padding: 8, border: "1px solid #ccc" }}>
          <div>캡처 미리보기</div>
          <img src={previewUrl} alt="미리보기" style={{ width: 160 }} />
        </div>
      )}
    </InferenceContext.Provider>
  );
};

export const useInference = () => {
  const ctx = useContext(InferenceContext);
  if (!ctx) throw new Error("useInference must be used within InferenceProvider");
  return ctx;
};

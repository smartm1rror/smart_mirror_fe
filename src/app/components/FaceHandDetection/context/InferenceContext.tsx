// InferenceProvider.tsx
"use client";

import React, { createContext, useContext, useRef, useState, useCallback } from "react";
import CameraModule from "./CameraModule";
import { InferenceContextType } from "../types";
import { useInferenceHandler } from "../hooks/useInferenceHandler";

const InferenceContext = createContext<InferenceContextType | undefined>(undefined);

export const InferenceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading, error, result, handleCapture } = useInferenceHandler();
  const [faceDetected, setFaceDetected] = useState(false);
  const cameraRef = useRef<{ capture: () => void }>(null);

  const captureAndInfer = useCallback(() => {
    cameraRef.current?.capture();
  }, []);

  const value: InferenceContextType = {
    loading,
    error,
    result,
    captureAndInfer,
    faceDetected,
    setFaceDetected
  }

  return (
    <InferenceContext.Provider value={value}>
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
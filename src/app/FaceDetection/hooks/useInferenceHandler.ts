import { useState, useCallback } from 'react';
import { InferenceService } from '../services/InferenceService';
import { InferenceResult } from '../types';

export const useInferenceHandler = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InferenceResult | null>(null);
  const [capturedBlobs, setCapturedBlobs] = useState<Blob[]>([]);

  const handleCapture = useCallback((blob: Blob) => {
    setCapturedBlobs(prev => [...prev, blob]);
  }, []);

  const sendAllImages = useCallback(async () => {
    let imagesToSend: Blob[] = [];

    if (capturedBlobs.length === 0) {
      setError("최소 한 장 이상의 이미지가 필요합니다.");
      return;
    }

    if (capturedBlobs.length >= 5) {
      // 마지막 5장만 사용
      imagesToSend = capturedBlobs.slice(-5);
    } else {
      // 마지막 이미지를 복사하여 5장 채움
      const lastBlob = capturedBlobs[capturedBlobs.length - 1];
      imagesToSend = [...capturedBlobs];
      while (imagesToSend.length < 5) {
        imagesToSend.push(lastBlob);
      }
    }

    // 디버깅 로그
    console.log("📤 전송할 이미지 수:", imagesToSend.length);
    imagesToSend.forEach((blob, index) => {
      console.log(`📸 Blob ${index + 1}:`, {
        type: blob.type,
        size: blob.size,
      });
    });

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await InferenceService.handleBatchCapture(imagesToSend);
      setResult(data);
      setCapturedBlobs([]); // 초기화
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  }, [capturedBlobs]);

  return {
    loading,
    error,
    result,
    handleCapture,
    sendAllImages,
    capturedBlobs,
  };
};
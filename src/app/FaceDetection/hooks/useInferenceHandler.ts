import { useState, useCallback } from 'react';
import { InferenceService } from '../services/InferenceService';
import { InferenceResult } from '../types';

export const useInferenceHandler = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InferenceResult | null>(null);
  const [capturedBlobs, setCapturedBlobs] = useState<Blob[]>([]);

  // 1초마다 한 장씩 Blob을 배열에 저장
  const handleCapture = useCallback((blob: Blob) => {
    setCapturedBlobs(prev => [...prev, blob]);
  }, []);

  // 카운트다운이 끝나면 모든 이미지를 한 번에 전송
  const sendAllImages = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await InferenceService.handleBatchCapture(capturedBlobs);
      setResult(data);
      setCapturedBlobs([]); // 전송 후 초기화
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
    handleCapture,    // 1초마다 한 장씩 저장
    sendAllImages,    // 카운트다운 끝나면 한 번에 전송
    capturedBlobs,
  };
};

import { useState, useCallback } from 'react';
import { InferenceService } from '../services/InferenceService';
import { InferenceResult } from '../types';

export const useInferenceHandler = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InferenceResult | null>(null);

  const handleCapture = useCallback(async (blob: Blob) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await InferenceService.handleCapture(blob);
      setResult(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    result,
    handleCapture
  };
};
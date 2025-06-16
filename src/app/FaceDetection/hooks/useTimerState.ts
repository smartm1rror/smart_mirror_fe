import { useState, useEffect } from 'react';
import { useInference } from '../context/InferenceContext';

export const useTimerState = () => {
  const { faceDetected, setAiPreprocessing } = useInference();
  const [countdown, setCountdown] = useState(3);
  const [phase, setPhase] = useState<"idle" | "counting" | "done">("idle");

  useEffect(() => {
    if (faceDetected) {
      setPhase("counting");
      setCountdown(5);
    } else {
      setPhase("idle");
      setCountdown(5);
    }
  }, [faceDetected]);

  useEffect(() => {
    if (phase !== "counting") return;
    if (countdown === 0) {
      setAiPreprocessing(true);
      setPhase("done");
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [phase, countdown, setAiPreprocessing]);

  return { phase, countdown, setAiPreprocessing };
};
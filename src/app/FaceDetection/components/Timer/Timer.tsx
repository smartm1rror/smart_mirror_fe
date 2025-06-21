"use client"

import React, { useEffect, useRef } from 'react';
import { useTimerState } from '../../hooks/useTimerState';
import RotatingEdgeLines from '../RotatingEdgeLines/page';
import { timerStyles } from '../../styles/timerAnimations';
import { useInference } from '../../context/InferenceContext';
import { useRouter } from 'next/navigation';

const Timer: React.FC = () => {
  const { phase, countdown } = useTimerState();
  const { aiPreprocessing, captureAndInfer, sendAllImages, result, error } = useInference();
  const prevCountdown = useRef<number | null>(null);

  useEffect(() => {
    if (phase === "counting" && countdown > 0) {
      if (prevCountdown.current !== countdown) {
        captureAndInfer();
        prevCountdown.current = countdown;
      }
    }
    if (phase === "counting" && countdown === 0) {
      sendAllImages();
    }
    if (phase !== "counting") {
      prevCountdown.current = null;
    }
  }, [phase, countdown, captureAndInfer, sendAllImages]);


  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        window.location.href = "/";
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const router = useRouter();

  useEffect(() => {
    if (result) {
      localStorage.setItem("myData", JSON.stringify(result));
      router.push("/DataScreen");
    }
  }, [result, router]);

  return (
    <>
      {aiPreprocessing ? (
        <>
          <RotatingEdgeLines />
          <div className="fixed inset-0 flex items-center justify-center z-50 select-none pointer-events-none">
            {/* 만약 error가 null이 아니라면 error 메시지 출력, null이라면 그냥 로딩 중... */}
            {error ? (
              <span className="text-5xl font-extrabold text-white drop-shadow-lg animate-gray-glow">
                뭔가 뒤에서 복잡한 문제가 생긴 거 같아요..
                <br />
                <br />
                3초 후 메인 화면으로 돌아갑니다<br />
                <span className="text-3xl font-semibold text-red-300">
                  ErrorCode : {error}
                </span>
              </span>
            ) : (
              <span className="text-5xl font-extrabold text-white drop-shadow-lg animate-gray-glow">
                AI가 얼굴 정보를 분석하고 있어요!
              </span>
            )}
          </div>
        </>
      ) : (
        (phase === "counting" || phase === "done") && (
          <div className="fixed inset-0 flex flex-col items-center justify-center z-50 select-none pointer-events-none">
            {phase === "counting" && (
              <span className="absolute rounded-full border-8 border-blue-300 w-[40vw] h-[40vw] opacity-30 animate-resonance" />
            )}
            <div className="relative flex flex-col items-center" style={{ marginTop: "28vh" }}>
              {phase === "counting" ? (
                <>
                  <span className="text-6xl font-extrabold text-white drop-shadow-lg mb-4 tracking-wide">
                    얼굴 정보를 스캔하고 있습니다
                  </span>
                  <span className="text-4xl font-semibold text-blue-100 mb-8">
                    정확한 측정을 위해 고개를 움직이지 말아주세요
                  </span>
                  <span className="text-[8rem] font-black text-blue-300 animate-pulse drop-shadow-4xl">
                    {countdown}
                  </span>
                </>
              ) : null}
            </div>
          </div>
        )
      )}
      <style jsx>{timerStyles}</style>
    </>
  );
};

export default Timer;

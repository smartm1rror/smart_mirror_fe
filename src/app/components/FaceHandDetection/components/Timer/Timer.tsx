"use client"

import React from 'react';
import { useTimerState } from '../../hooks/useTimerState';
import RotatingEdgeLines from '../RotatingEdgeLines/page';
import { timerStyles } from '../../styles/timerAnimations';
import { useInference } from '../../context/InferenceContext';

const Timer: React.FC = () => {
  const { phase, countdown } = useTimerState();
  const { aiPreprocessing } = useInference();


  return (
    <>
      {aiPreprocessing ? (
        <>
          <RotatingEdgeLines />
          <div className="fixed inset-0 flex items-center justify-center z-50 select-none pointer-events-none">
            <span className="text-3xl font-extrabold text-white drop-shadow-lg animate-gray-glow">
              AI가 얼굴 정보를 분석하고 있어요!
            </span>
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
                  <span className="text-4xl font-extrabold text-white drop-shadow-lg mb-4 tracking-wide">
                    얼굴 정보를 스캔하고 있습니다
                  </span>
                  <span className="text-2xl font-semibold text-blue-100 mb-8">
                    정확한 측정을 위해 고개를 움직이지 말아주세요
                  </span>
                  <span className="text-[8rem] font-black text-blue-300 animate-pulse drop-shadow-2xl">
                    {countdown}
                  </span>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        )
      )}


      <style jsx>{timerStyles}</style>
    </>
  );
};

export default Timer;
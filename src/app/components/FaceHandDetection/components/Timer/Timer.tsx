"use client"

import React from 'react';
import { useTimerState } from '../../hooks/useTimerState';
import RotatingEdgeLines from '../RotatingEdgeLines/page';
import { timerStyles } from '../../styles/timerAnimations';

const Timer: React.FC = () => {
  const { phase, countdown } = useTimerState();

  return (
    <>
      {(phase === "counting" || phase === "done") && (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50 select-none pointer-events-none">
          {phase === "counting" && (
            <span className="absolute rounded-full border-8 border-blue-300 w-[40vw] h-[40vw] opacity-30 animate-resonance" />
          )}

          {phase === "done" && <RotatingEdgeLines />}

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
              <span className="text-3xl font-extrabold text-white drop-shadow-lg animate-gray-glow">
                지금 AI가 이것저것 찾아보고 있어요!
              </span>
            )}
          </div>
        </div>
      )}
      <style jsx>{timerStyles}</style>
    </>
  );
};

export default Timer;
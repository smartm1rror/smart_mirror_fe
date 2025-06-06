"use client";

import React from 'react';

type SkinLevelThermometerModernProps = {
  level: number; // 1~10
};

export default function SkinLevelThermometerModern({ level }: SkinLevelThermometerModernProps) {
  const safeLevel = Math.min(Math.max(level, 1), 10);

  // 색상: 낮을 때는 회색, 높을 때는 밝은 블루/옐로우 계열
  let fillColor = '#b0b8c4'; // 기본: 회색빛
  if (safeLevel >= 8) fillColor = 'linear-gradient(180deg, #fffbe0 0%, #fff176 60%, #5fd1f9 100%)';
  else if (safeLevel >= 5) fillColor = 'linear-gradient(180deg, #e0f7fa 0%, #7ee8fa 80%, #a1c4fd 100%)';

  // 체온계 크기
  const thermometerHeight = 340;
  const thermometerWidth = 72;
  const fillMaxHeight = thermometerHeight;
  const fillHeight = (safeLevel / 10) * fillMaxHeight;

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      right: '6%',
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      zIndex: 20,
      userSelect: 'none',
      minWidth: 180,
    }}>
      {/* 숫자 */}
      <div style={{
        fontSize: '4.2rem',
        fontWeight: 800,
        color: '#fff',
        marginBottom: '18px',
        letterSpacing: '0.04em',
        textShadow: '0 2px 12px #2229, 0 0 8px #fff8',
      }}>
        {safeLevel}
      </div>
      {/* 체온계 본체 (동그라미 없이) */}
      <div style={{
        position: 'relative',
        width: thermometerWidth,
        height: thermometerHeight,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}>
        {/* 체온계 바디 */}
        <div style={{
          position: 'absolute',
          left: (thermometerWidth - 28) / 2,
          top: 0,
          width: 28,
          height: thermometerHeight,
          background: 'linear-gradient(180deg, #f7fafc 60%, #e0f3fc 100%)',
          borderRadius: 16,
          boxShadow: '0 2px 16px 0 rgba(60,120,255,0.07)',
          border: '2.5px solid #e0e0e7',
          zIndex: 1,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
        }}>
          {/* 채워진 부분 */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: fillHeight,
            background: fillColor,
            borderRadius: '0 0 16px 16px',
            transition: 'height 0.5s cubic-bezier(.4,2,.6,1)',
            boxShadow: '0 0 16px 0 #5fd1f955',
          }} />
        </div>
        {/* 외곽선 강조 */}
        <div style={{
          position: 'absolute',
          left: (thermometerWidth - 28) / 2,
          top: 0,
          width: 28,
          height: thermometerHeight,
          borderRadius: 16,
          border: '2.5px solid #e0e0e7',
          boxSizing: 'border-box',
          pointerEvents: 'none',
          zIndex: 3,
        }} />
      </div>
      {/* 라벨 */}
      <div style={{
        marginTop: '32px',
        fontSize: '1.15rem',
        color: '#fff',
        letterSpacing: '0.01em',
        fontWeight: 500,
        textShadow: '0 1px 8px #23243a55'
      }}>
        피부 상태 레벨
      </div>
    </div>
  );
}

"use client";

import React from 'react';

// 해 쨍쨍 SVG (10렙)
function SunnyIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="16" fill="#ffe066" />
      <g stroke="#ffe066" strokeWidth="4">
        <line x1="32" y1="6" x2="32" y2="18" />
        <line x1="32" y1="46" x2="32" y2="58" />
        <line x1="6" y1="32" x2="18" y2="32" />
        <line x1="46" y1="32" x2="58" y2="32" />
        <line x1="14" y1="14" x2="22" y2="22" />
        <line x1="42" y1="42" x2="50" y2="50" />
        <line x1="14" y1="50" x2="22" y2="42" />
        <line x1="42" y1="22" x2="50" y2="14" />
      </g>
    </svg>
  );
}

type SkinMonitorProps = {
  level: number; // 1~10
  diagnosis: string;
};

export default function SkinMonitor({ level, diagnosis }: SkinMonitorProps) {
  let accent = '#b0b8c4';
  if (level >= 8) accent = '#5fd1f9';
  else if (level >= 5) accent = '#7ee8fa';

  // 비 내리는 배경 효과 (좌상단→우하단)
  const showRain = level <= 3;
  const rainDropCount = 22;
  const rainEffect = showRain ? (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      overflow: 'hidden',
      zIndex: 0,
    }}>
      <style>{`
        @keyframes rainDropDiag {
          0% { transform: translate(100px, -40px) rotate(28deg); opacity: 0.8; }
          80% { opacity: 1; }
          100% { transform: translate(-40px, 120px) rotate(28deg); opacity: 0; }
        }
        .rain-drop-diag {
          position: absolute;
          width: 2.5px;
          height: 28px;
          background: linear-gradient(180deg, #e0f3fc 0%, #b0b8c4 100%);
          border-radius: 2px;
          opacity: 0.7;
          animation: rainDropDiag linear infinite;
          transform: rotate(28deg);
          transform-origin: center;
        }
      `}</style>
      {Array.from({ length: rainDropCount }).map((_, i) => {
        const left = Math.random() * 98;
        const delay = Math.random() * 1.5;
        const duration = 1.1 + Math.random() * 1.2;
        return (
          <div
            key={i}
            className="rain-drop-diag"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              top: 0,
              zIndex: 0,
            }}
          />
        );
      })}
    </div>
  ) : null;

  // 해 쨍쨍 효과 (10렙)
  const showSunny = level === 10;
  const sunnyEffect = showSunny ? (
    <div style={{
      position: 'absolute',
      top: 32,
      right: 32,
      zIndex: 1,
      filter: 'drop-shadow(0 0 32px #ffe06699)',
    }}>
      <SunnyIcon />
    </div>
  ) : null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '15%',
        width: '56%',
        height: '44vh',
        transform: 'translateY(-50%)',
        minWidth: 340,
        maxWidth: 1200,
        padding: '48px 36px 48px 36px',
        borderRadius: 32,
        background: 'linear-gradient(135deg, #23243a 10%, #3b4d65 90%)',
        boxShadow: '0 8px 40px 0 rgba(60,120,255,0.10)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        zIndex: 20,
        userSelect: 'none',
        overflow: 'hidden',
        color: '#fff',
        fontSize: '1.15rem',
      }}
    >
      {rainEffect}
      {sunnyEffect}
      <div
        style={{
          fontSize: '2.1rem',
          fontWeight: 800,
          color: accent,
          marginBottom: 22,
          letterSpacing: '0.02em',
          textShadow: '0 2px 12px #23243a66',
          zIndex: 1,
        }}
      >
        피부 진단 평가
      </div>
      <div
        style={{
          fontSize: '2.1rem',
          color: '#fff',
          fontWeight: 800,
          lineHeight: 1.35,
          textShadow: '0 2px 12px #23243a99, 0 0 8px #fff2',
          marginBottom: 10,
          wordBreak: 'keep-all',
          zIndex: 1,
        }}
      >
        {diagnosis}
      </div>
      <div
        style={{
          marginTop: 22,
          fontSize: '1.6rem',
          color: '#b0b8c4',
          fontWeight: 700,
          letterSpacing: '0.01em',
          zIndex: 1,
          position: 'relative',
          top: 80,
        }}
      >
        현재 피부 레벨: <span style={{ color: accent, fontWeight: 900 }}>{level}</span>
      </div>
    </div>
  );
}

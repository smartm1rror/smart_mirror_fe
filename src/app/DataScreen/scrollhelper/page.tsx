"use client";

import { useEffect, useState } from "react";

export default function ScrollHelper() {
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    // 0.5초 후 알림 fade-in
    const timer = setTimeout(() => setShowNotice(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      fontFamily: "inherit"
    }}>
      {/* 중앙 상단 알림 */}
      <div style={{
        position: "absolute",
        top: "4vh",
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(30,30,30,0.9)",
        borderRadius: "2rem",
        padding: "0.9rem 2.2rem",
        fontSize: "1.25rem",
        fontWeight: 600,
        letterSpacing: "0.02em",
        opacity: showNotice ? 1 : 0,
        transition: "opacity 1s"
      }}>
        AI가 데이터 분석을 완료했습니다!
      </div>

      {/* 안내 영역 - 페이지 자동 전환 메시지 */}
      <div style={{
        display: "flex",
        flexDirection: "column", // 세로 정렬
        alignItems: "center",
        marginTop: "8vh",
        textAlign: "center"
      }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>
          잠시 후 다음 페이지로<br />자동 전환됩니다.
        </div>
        <div style={{
          width: "120px",
          height: "120px",
          background: "rgba(255,255,255,0.08)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "pulseEffect 1.5s infinite alternate" // 새로운 애니메이션 추가
        }}>
          <span role="img" aria-label="화살표 아이콘" style={{ fontSize: "3.5rem" }}>➡️</span>
        </div>
        <div style={{
            fontSize: "1rem",
            marginTop: "1.5rem",
            color: "rgba(255,255,255,0.7)"
        }}>
        </div>
      </div>

      {/* 새로운 애니메이션 keyframes */}
      <style>{`
        @keyframes pulseEffect {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
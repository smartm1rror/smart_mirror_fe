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

      {/* 안내 영역 */}
      <div style={{
        display: "flex",
        gap: "20vw",
        alignItems: "center",
        marginTop: "8vh"
      }}>
        {/* 왼손 안내 */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <div style={{
            width: "90px",
            height: "90px",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.2rem",
            animation: "handRaiseLeft 1.6s infinite alternate"
          }}>
            <span role="img" aria-label="왼손" style={{ fontSize: "2.5rem" }}>🖐️</span>
          </div>
          <div style={{ fontSize: "1.15rem", textAlign: "center" }}>
            왼손을 들면<br />
            <strong style={{ fontWeight: 700 }}>왼쪽 페이지로 이동</strong>
          </div>
        </div>

        {/* 오른손 안내 */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <div style={{
            width: "90px",
            height: "90px",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.2rem",
            animation: "handRaiseRight 1.6s infinite alternate"
          }}>
            <span role="img" aria-label="오른손" style={{ fontSize: "2.5rem" }}>🖐️</span>
          </div>
          <div style={{ fontSize: "1.15rem", textAlign: "center" }}>
            오른손을 들면<br />
            <strong style={{ fontWeight: 700 }}>오른쪽 페이지로 이동</strong>
          </div>
        </div>
      </div>

      {/* 애니메이션 keyframes */}
      <style>{`
        @keyframes handRaiseLeft {
          0% { transform: translateY(0); }
          100% { transform: translateY(-18px) scale(1.07); }
        }
        @keyframes handRaiseRight {
          0% { transform: translateY(0); }
          100% { transform: translateY(-18px) scale(1.07); }
        }
      `}</style>
    </div>
  );
}

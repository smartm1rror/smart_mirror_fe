import React, { useEffect, useState } from "react";
import { useInference } from "../context/InferenceContext";

export default function Timer() {
    const { faceDetected } = useInference();
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
            setPhase("done");
            return;
        }
        const timer = setTimeout(() => setCountdown((c) => c - 1), 1800);
        return () => clearTimeout(timer);
    }, [phase, countdown]);

    return (
        <>
            {(phase === "counting" || phase === "done") && (
                <div className="fixed inset-0 flex flex-col items-center justify-center z-50 select-none pointer-events-none">
                    {/* 공명 원: 카운트다운 중에만 표시 */}
                    {phase === "counting" && (
                        <span
                            className={`
                                absolute rounded-full border-8 border-blue-300
                                w-[40vw] h-[40vw] opacity-30 animate-resonance
                            `}
                            style={{
                                transition: "all 1s cubic-bezier(0.4,0,0.2,1)",
                            }}
                        ></span>
                    )}

                    {/* 분석 중입니다: 가장자리 선 애니메이션 */}
                    {phase === "done" && <RotatingEdgeLines />}

                    {/* 안내 메시지: 중앙 아래로 내림 */}
                    <div
                        className="relative flex flex-col items-center"
                        style={{
                            marginTop: "28vh", // 중앙보다 아래로
                        }}
                    >
                        {phase === "counting" && (
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
                        )}
                        {phase === "done" && (
                            <span className="text-3xl font-extrabold text-white drop-shadow-lg animate-gray-glow">
                                지금 AI가 이것저것 찾아보고 있어요!
                            </span>
                        )}
                    </div>
                </div>
            )}
            {/* 커스텀 애니메이션 */}
            <style jsx>{`
  @keyframes resonance {
      0% {
          transform: scale(0.2);
          opacity: 0.3;
      }
      80% {
          transform: scale(0.8);
          opacity: 0.15;
      }
      100% {
          transform: scale(1.5);
          opacity: 0;
      }
  }
  .animate-resonance {
      animation: resonance 1.8s cubic-bezier(0.4,0,0.2,1) infinite;
  }
  @keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
  }
  .animate-fadein {
      animation: fadein 1s ease-in;
  }
  @keyframes grayGlow {
      0%, 100% {
          color: #fff;
          text-shadow: 0 0 2px #fff, 0 0 2px #ccc;
      }
      50% {
          color:rgb(155, 155, 155);
          text-shadow: 0 0 10pxrgb(109, 109, 109), 0 0 2px #bbb;
      }
  }
  .animate-gray-glow {
      animation: grayGlow 2.5s ease-in-out infinite;
  }
`}</style>
        </>
    );
}

function useWindowSize() {
    const [size, setSize] = useState({ width: 0, height: 0 });
    useEffect(() => {
        function updateSize() {
            setSize({ width: window.innerWidth, height: window.innerHeight });
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
}

// 가장자리 빙글빙글 도는 흰색 선 애니메이션
function RotatingEdgeLines() {
    const { width, height } = useWindowSize();

    // 네모 여백
    const margin = 60;
    const rectWidth = width - margin * 2;
    const rectHeight = height - margin * 2;
    const perim = 2 * (rectWidth + rectHeight);

    const segLen = 240;
    const gapLen = perim - segLen;
    const dasharray = `${segLen} ${gapLen}`;
    const offset2 = -(perim / 2 + segLen / 2);

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            <svg
                width="100vw"
                height="100vh"
                viewBox={`0 0 ${width} ${height}`}
                style={{
                    width: "100vw",
                    height: "100vh",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 100,
                }}
            >
                {/* 첫 번째 선 */}
                <rect
                    x={margin}
                    y={margin}
                    width={rectWidth}
                    height={rectHeight}
                    fill="none"
                    stroke="white"
                    strokeWidth={10}
                    rx={40}
                    strokeDasharray={dasharray}
                    strokeDashoffset={0}
                    style={{
                        filter: "drop-shadow(0 0 18px #fff)",
                        opacity: 0.9,
                        transition: "stroke-dashoffset 0.3s",
                    }}
                    className="rotating-dash-1"
                />
                {/* 두 번째 선 (정확히 반대편에서 시작, 별도 애니메이션) */}
                <rect
                    x={margin}
                    y={margin}
                    width={rectWidth}
                    height={rectHeight}
                    fill="none"
                    stroke="white"
                    strokeWidth={10}
                    rx={40}
                    strokeDasharray={dasharray}
                    strokeDashoffset={offset2}
                    style={{
                        filter: "drop-shadow(0 0 18px #fff)",
                        opacity: 0.9,
                        transition: "stroke-dashoffset 0.3s",
                    }}
                    className="rotating-dash-2"
                />
            </svg>
            <style jsx>{`
        .rotating-dash-1 {
          animation: dashmove1 8s linear infinite;
        }
        .rotating-dash-2 {
          animation: dashmove2 8s linear infinite;
        }
        @keyframes dashmove1 {
          to {
            stroke-dashoffset: -${perim}px;
          }
        }
        @keyframes dashmove2 {
          from {
            stroke-dashoffset: ${offset2}px;
          }
          to {
            stroke-dashoffset: ${-perim + offset2}px;
          }
        }
      `}</style>
        </div>
    );
}
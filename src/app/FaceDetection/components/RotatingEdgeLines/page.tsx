"use client"

import React from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';

const RotatingEdgeLines: React.FC = () => {
    const { width, height } = useWindowSize();

    // 네모 여백
    const margin = 60;
    const marginTop = 120;
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
                    y={marginTop}
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
                {/* 두 번째 선 */}
                <rect
                    x={margin}
                    y={marginTop}
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
};

export default RotatingEdgeLines;
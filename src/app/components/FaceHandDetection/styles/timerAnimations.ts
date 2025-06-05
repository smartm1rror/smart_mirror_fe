export const timerStyles = `
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
        from { 
            opacity: 0; 
        }
        to { 
            opacity: 1; 
        }
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
            color: rgb(155, 155, 155);
            text-shadow: 0 0 10px rgb(109, 109, 109), 0 0 2px #bbb;
        }
    }
    .animate-gray-glow {
        animation: grayGlow 2.5s ease-in-out infinite;
    }
`;

// 필요한 경우 타입 정의도 추가할 수 있습니다
export interface TimerStylesProps {
    perim?: number;
    offset2?: number;
}

// 동적인 스타일이 필요한 경우를 위한 함수
export const getRotatingLinesStyles = (props: TimerStylesProps) => `
    .rotating-dash-1 {
        animation: dashmove1 8s linear infinite;
    }
    .rotating-dash-2 {
        animation: dashmove2 8s linear infinite;
    }
    @keyframes dashmove1 {
        to {
            stroke-dashoffset: -${props.perim}px;
        }
    }
    @keyframes dashmove2 {
        from {
            stroke-dashoffset: ${props.offset2}px;
        }
        to {
            stroke-dashoffset: ${-props.perim! + props.offset2!}px;
        }
    }
`;
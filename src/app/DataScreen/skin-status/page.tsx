"use client";

import { useEffect } from "react";
import { useResource } from "../context/ResourceContext";
import SkinMonitor from "./skinmonitor/SkinMonitor";
import SkinLevelThermometer from "./thermometer/SkinLevelThermometer";



export default function SkinStatusPage() {

    const { myData, setMyData } = useResource();
    const level = myData.acne_level;
    const diagnosis = getDiagnosisText(level);

    useEffect(() => {
        setMyData((prevData) => {
            if (!prevData) return prevData;
            return {
                ...prevData,
                last_acne_level: myData.acne_level,
            };
        });
        // myData.acne_level이 바뀔 때만 실행
    }, [myData.acne_level, setMyData]);

    return (
        <div>
            <div
                className="text-4xl font-bold text-center mb-4"
                style={{
                    marginTop: "30px",
                }}
            >
                피부 상태
            </div>
            <SkinMonitor level={level} diagnosis={diagnosis} />
            <SkinLevelThermometer level={level} />
        </div>
    );
}

function getDiagnosisText(level: number): string {
    if (level >= 10) return "피부 상태가 매우 훌륭합니다! ✨";
    if (level === 9) return "탄탄하고 윤기 있는 피부를 유지 중입니다.";
    if (level === 8) return "전반적으로 건강한 피부 상태입니다.";
    if (level === 7) return "피부 컨디션이 꽤 괜찮아요.";
    if (level === 6) return "살짝 민감할 수 있으니 주의해 주세요.";
    if (level === 5) return "피부에 약간의 피로가 보입니다.";
    if (level === 4) return "트러블이 시작될 수 있으니 관리가 필요해요.";
    if (level === 3) return "피부 컨디션이 다소 나빠지고 있어요.";
    if (level === 2) return "자극이나 트러블이 많아 보입니다.";
    if (level === 1) return "피부에 심각한 문제 징후가 있습니다.";
    return "전문적인 피부 관리가 꼭 필요합니다. ⚠️";
}

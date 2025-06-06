"use client";

import SkinMonitor from "./skinmonitor/SkinMonitor";
import SkinLevelThermometer from "./thermometer/SkinLevelThermometer";

export default function SkinStatusPage() {
    const level = 7;
    const diagnosis = "피부가 망골난 거 같습니다";

    return (
        <div>
            <div
                className="text-4xl font-bold text-center mb-4"
                style={{
                    marginTop: "30px",
                }}
            >피부 상태</div>
            <SkinMonitor
                level={level}
                diagnosis={diagnosis}
            />
            <SkinLevelThermometer level={level} />
        </div>
    )
}

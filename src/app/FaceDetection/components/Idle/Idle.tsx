"use client"

import { useInference } from "../../context/InferenceContext";
import '@/app/FaceDetection/styles/idleDesign.css';
import { useClock } from "../../hooks/idle/clock";
import { useWeatherInfo } from "../../hooks/idle/weather";

export default function Idle() {

    const { faceDetected, aiPreprocessing } = useInference();

    const { weather } = useWeatherInfo();
    const { currentTime } = useClock();

    return (
        <div>
            <div className="top-bar">
                <div className="weather left-top">{weather?.description} {weather?.temp}°C</div>
                <div className="clock right-top">{currentTime}</div>
            </div>

            {!faceDetected && !aiPreprocessing ?
                <div>
                    <div className="idle-container">
                        <div className="center-message">
                            거울 앞에서 이쪽을 바라보세요<br/>
                            얼굴 사진을 수집하며, 정보가 생성되면 데이터는 바로 삭제됩니다!
                        </div>
                    </div>

                </div>
                :
                <div></div>}
        </div>
    )
}
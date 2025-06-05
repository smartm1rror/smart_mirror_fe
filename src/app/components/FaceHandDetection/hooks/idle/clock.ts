import { useEffect, useState } from "react"

export const useClock = () => {
    const [currentTime, setCurrentTime] = useState<string>("");

    useEffect(() => {
        const updateClock = () => {
            setCurrentTime(new Date().toLocaleTimeString());
        };

        updateClock();

        const clockInterval = setInterval(updateClock, 1000);

        return () => clearInterval(clockInterval);
    }, [])

    return { currentTime };
}
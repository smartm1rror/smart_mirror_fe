import { useState, useEffect } from 'react';

interface WeatherInfo {
  temp: number;
  description: string;
}

export const useWeatherInfo = () => {
  const [weather, setWeather] = useState<WeatherInfo | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      // 실제 API 호출 예시
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=Changwon&lang=ko`);
      const data = await response.json();
      setWeather({ temp: data.current.temp_c, description: data.current.condition.text });

      // 임시 더미 데이터
      // setWeather({ temp: 25, description: '맑음' });
    };

    fetchWeather();

    const intervalId = setInterval(fetchWeather, 3600000); // 1 hour

    return () => clearInterval(intervalId);
  }, []);

  return { weather };
}

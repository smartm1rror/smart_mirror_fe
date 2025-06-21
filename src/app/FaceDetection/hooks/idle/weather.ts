import { useState, useEffect } from 'react';

interface WeatherInfo {
  temp: number;
  description: string;
}

export const useWeatherInfo = () => {
  const [weather, setWeather] = useState<WeatherInfo | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('/api/weather');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setWeather({
          temp: data.temp,
          description: data.description,
        });
      } catch (err) {
        console.error('날씨 정보 fetch 에러:', err);
      }
    };

    fetchWeather();
    const intervalId = setInterval(fetchWeather, 3600000);
    return () => clearInterval(intervalId);
  }, []);


  return { weather };
};

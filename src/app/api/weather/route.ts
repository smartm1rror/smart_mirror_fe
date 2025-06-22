// app/api/weather/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Changwon&lang=ko`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return NextResponse.json({
      temp: data.current?.temp_c ?? null,
      description: data.current?.condition?.text ?? '',
    });
  } catch (error) {
    return NextResponse.json({ temp: null, description: error }, { status: 500 });
  }
}

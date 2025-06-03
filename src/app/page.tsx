"use client";

import React, { useState } from 'react';
import FaceDetectionCamera from './components/FaceHandDetection/page';

const HomePage: React.FC = () => {
    const [screenshots, setScreenshots] = useState<string[]>([]);

    const handleScreenshotTaken = (imageSrc: string) => {
        setScreenshots(prev => [...prev, imageSrc]);
        console.log('스크린샷이 촬영되었습니다!');
    };

    const downloadImage = (imageSrc: string, index: number) => {
        const link = document.createElement('a');
        link.href = imageSrc;
        link.download = `face-screenshot-${Date.now()}-${index + 1}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const clearAllScreenshots = () => {
        setScreenshots([]);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        🎯 얼굴 인식 자동 촬영
                    </h1>
                    <p className="text-gray-600 text-lg">
                        카메라에 얼굴을 맞추면 3초 후 자동으로 사진이 촬영됩니다
                    </p>
                </div>

                {/* 중요: onScreenshotTaken prop 전달 */}
                <FaceDetectionCamera onScreenshotTaken={handleScreenshotTaken} />

                {screenshots.length > 0 && (
                    <div className="mt-12">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">
                                촬영된 사진들 ({screenshots.length}장)
                            </h2>
                            <button
                                onClick={clearAllScreenshots}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                모두 삭제
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {screenshots.map((screenshot, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                    <img
                                        src={screenshot}
                                        alt={`스크린샷 ${index + 1}`}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4 space-y-2">
                                        <p className="text-sm text-gray-500 text-center">
                                            사진 #{index + 1}
                                        </p>
                                        <button
                                            onClick={() => downloadImage(screenshot, index)}
                                            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors"
                                        >
                                            💾 다운로드
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {screenshots.length === 0 && (
                    <div className="mt-12 text-center text-gray-500">
                        <p>아직 촬영된 사진이 없습니다. 카메라에 얼굴을 맞춰보세요!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;

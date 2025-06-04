"use client"

import { InferenceProvider } from "./context/InferenceContext";
import DetectFace from "./hooks/useFaceDetection";
import Timer from "./hooks/useTimer";

export default function FaceHandDetection() {
  return (
    <InferenceProvider>
      <DetectFace/>
      <Timer/>
    </InferenceProvider>
  )
}

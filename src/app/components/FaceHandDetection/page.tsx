"use client"

import { InferenceProvider } from "./context/InferenceContext";
import DetectFace from "./hooks/useFaceDetection";
import Timer from "./components/Timer/Timer";

export default function FaceHandDetection() {
  return (
    <InferenceProvider>
      <DetectFace/>
      <Timer/>
    </InferenceProvider>
  )
}

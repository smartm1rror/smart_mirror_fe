"use client"

import { InferenceProvider } from "./context/InferenceContext";
import DetectFace from "./hooks/useFaceDetection";
import Idle from "./components/Idle/Idle";
import Timer from "./components/Timer/Timer";

export default function FaceDetection() {
  return (
    <InferenceProvider>
      <DetectFace/>
      <Timer/>
      <Idle/>
    </InferenceProvider>
  )
}

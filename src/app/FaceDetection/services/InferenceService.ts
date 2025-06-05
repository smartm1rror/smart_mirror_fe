import { InferenceResult } from "../types";

export class InferenceService {
  static async handleCapture(blob: Blob): Promise<InferenceResult> {
    const formData = new FormData();
    formData.append("image", blob, "capture.jpg");
    
    const response = await fetch("/api/infer", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("서버 오류");
    }

    return response.json();
  }
}
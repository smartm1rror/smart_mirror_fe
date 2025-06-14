import { InferenceResult } from "../types";

export class InferenceService {
  static async handleBatchCapture(blobs: Blob[]): Promise<InferenceResult> {
    const formData = new FormData();
    blobs.forEach((blob, idx) => {
      formData.append("image", blob, `capture${idx + 1}.jpg`);
    });

    const response = await fetch("http://localhost:8000/api/analyze/", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("서버 오류");
    }

    return response.json();
  }
}

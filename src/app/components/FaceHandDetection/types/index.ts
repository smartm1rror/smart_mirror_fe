/**
 * loading : 준비 상태
 * error : 오류
 * result : 결과
 * captureAndInfer : 화면 캡쳐
 * faceDetected : 얼굴 감지 상태
 * setFaceDetected : 얼굴 감지 상태 변경
 */

export interface InferenceContextType {
  loading: boolean;
  error: string | null;
  result: InferenceResult | null;
  captureAndInfer: () => void;
  faceDetected: boolean;
  setFaceDetected: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface InferenceResult {
  success: boolean;
  data?: {
    prediction?: string;
    confidence?: number;
  };
  message?: string;
}
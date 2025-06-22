import { useResource } from "../context/ResourceContext";

const LEVEL_RECOMMENDATIONS = [
  {
    care: "피부 상태가 매우 좋지 않습니다. 즉시 전문의 상담을 받고, 자극을 최소화하며 청결과 진정에 집중해 주세요.",
    products: [
      { name: "피부과 전문 클렌저", desc: "민감하고 트러블이 심한 피부를 위한 초저자극 클렌저입니다." },
      { name: "고보습 진정 크림", desc: "극도로 예민해진 피부를 진정시키고 보호합니다." }
    ]
  },
  {
    care: "피부 트러블이 매우 심각한 단계입니다. 세안 후 즉시 진정 케어를 하고, 피부과 전문의 상담을 권장합니다.",
    products: [
      { name: "약산성 진정 토너", desc: "자극받은 피부를 빠르게 진정시켜줍니다." },
      { name: "수딩 마스크팩", desc: "집중 진정이 필요한 피부에 즉각적인 효과를 줍니다." }
    ]
  },
  {
    care: "피부 트러블이 심한 상태입니다. 자극을 줄이고, 청결과 진정에 집중하세요. 피부를 과도하게 만지지 마세요.",
    products: [
      { name: "티트리 진정 앰플", desc: "트러블 부위를 효과적으로 진정시킵니다." },
      { name: "저자극 보습 크림", desc: "피부 장벽을 보호하며 촉촉함을 유지합니다." }
    ]
  },
  {
    care: "트러블이 많이 보이는 단계입니다. 저자극 클렌저와 진정 제품 위주로 관리하세요.",
    products: [
      { name: "약산성 클렌저", desc: "피부 장벽을 지키며 노폐물을 부드럽게 제거합니다." },
      { name: "센텔라 진정 크림", desc: "센텔라 성분이 예민한 피부를 진정시켜줍니다." }
    ]
  },
  {
    care: "트러블이 지속적으로 발생하는 단계입니다. 세안 후 진정과 보습에 신경 써주세요.",
    products: [
      { name: "카밍 토너", desc: "피부를 진정시키고 유수분 밸런스를 맞춰줍니다." },
      { name: "수분 진정 마스크", desc: "피부에 충분한 수분을 공급하고 진정 효과를 줍니다." }
    ]
  },
  {
    care: "트러블이 눈에 띄게 줄었지만, 아직 관리가 필요합니다. 자극을 피하고 꾸준한 보습을 해주세요.",
    products: [
      { name: "저자극 수분 크림", desc: "피부에 자극 없이 촉촉함을 선사합니다." },
      { name: "진정 앰플", desc: "피부를 빠르게 진정시켜줍니다." }
    ]
  },
  {
    care: "피부가 점차 안정되고 있습니다. 저자극 제품 위주로 관리하며, 자외선 차단을 잊지 마세요.",
    products: [
      { name: "약산성 폼클렌저", desc: "피부를 부드럽게 세정합니다." },
      { name: "데일리 선크림", desc: "자외선으로부터 피부를 보호해줍니다." }
    ]
  },
  {
    care: "피부가 건강을 회복하고 있습니다. 현재 루틴을 꾸준히 유지하고, 보습과 자외선 차단에 신경 쓰세요.",
    products: [
      { name: "수분 에센스", desc: "피부에 산뜻한 수분을 공급합니다." },
      { name: "라이트 크림", desc: "가볍게 피부를 보호합니다." }
    ]
  },
  {
    care: "피부가 매우 건강한 상태입니다. 기본적인 보습과 자외선 차단만 유지해도 충분합니다.",
    products: [
      { name: "데일리 로션", desc: "피부를 산뜻하게 유지합니다." },
      { name: "저자극 선크림", desc: "피부에 부담 없이 자외선을 차단합니다." }
    ]
  },
  {
    care: "피부 컨디션이 최상에 가깝습니다! 현재의 건강한 루틴을 꾸준히 유지하세요.",
    products: [
      { name: "수분 미스트", desc: "언제 어디서나 피부에 수분을 더해줍니다." },
      { name: "멀티 비타민 크림", desc: "피부에 활력을 더해줍니다." }
    ]
  },
  {
    care: "피부가 최상의 상태입니다! 건강한 생활습관과 기본적인 스킨케어만으로도 충분합니다.",
    products: [
      { name: "워터 젤 크림", desc: "가볍고 산뜻하게 피부를 보호합니다." },
      { name: "데일리 에센스", desc: "피부에 생기를 더해줍니다." }
    ]
  }
];



function getCareRecommendation(acne_level: number) {
  const idx = Math.max(0, Math.min(10, Math.round(acne_level)));
  return LEVEL_RECOMMENDATIONS[idx];
}

export default function SkinDiagnosisPage() {
  const { myData } = useResource();

  // last_acne_level를 사용해 0~10 범위로 변환
  const acne_level = Number(myData.acne_level);
  const skin_lv = myData?.skin_lv || "정보 없음";
  const confidence = myData?.confidence;
  const pc_confidence = myData?.pc_confidence;

  const { care, products } = getCareRecommendation(acne_level);

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingTop: "7vh",
      fontFamily: "inherit"
    }}>
      {/* 진단 결과 요약 */}
      <div style={{
        fontSize: "2rem",
        fontWeight: 700,
        marginBottom: "1.8rem",
        letterSpacing: "0.01em"
      }}>
        피부 진단 결과
      </div>

      {/* 피부 레벨 및 신뢰도 */}
      <div style={{
        fontSize: "1.15rem",
        marginBottom: "2.2rem",
        textAlign: "center"
      }}>
        <div>
          <span style={{
            background: "rgba(255,255,255,0.08)",
            borderRadius: "1.2rem",
            padding: "0.5rem 1.3rem",
            fontWeight: 600
          }}>
            {typeof skin_lv === "string" ? skin_lv : `피부레벨 ${skin_lv}`} (트러블 지수: {acne_level}/10)
          </span>
        </div>
        {(confidence || pc_confidence) && (
          <div style={{ marginTop: "0.8rem", fontSize: "1rem", opacity: 0.7 }}>
            진단 신뢰도: {pc_confidence || `${confidence}%`}
          </div>
        )}
      </div>

      {/* 관리 방법 추천 */}
      <div style={{
        background: "rgba(255,255,255,0.07)",
        borderRadius: "1.5rem",
        padding: "1.2rem 2.3rem",
        marginBottom: "2.2rem",
        fontSize: "1.12rem",
        fontWeight: 500,
        textAlign: "center",
        maxWidth: "90vw"
      }}>
        {care}
      </div>

      {/* 추천 화장품 */}
      {products.length > 0 && (
        <div style={{
          width: "100%",
          maxWidth: "450px",
          display: "flex",
          flexDirection: "column",
          gap: "1.3rem"
        }}>
          <div style={{
            fontSize: "1.15rem",
            fontWeight: 600,
            marginBottom: "0.6rem"
          }}>
            추천 화장품
          </div>
          {products.map((item, idx) => (
            <div key={idx} style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: "1.2rem",
              padding: "1.1rem 1.6rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.3rem"
            }}>
              <span style={{ fontWeight: 600 }}>{item.name}</span>
              <span style={{ fontSize: "0.98rem", opacity: 0.83 }}>{item.desc}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

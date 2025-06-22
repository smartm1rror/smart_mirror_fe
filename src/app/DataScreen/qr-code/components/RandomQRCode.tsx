'use client';

import QRCode from 'react-qr-code';
import { useResource } from '../../context/ResourceContext';
import { myData } from '../../types';

// myData의 모든 속성을 쿼리스트링으로 변환하여 URL 생성
function getRandomString(myData: myData | undefined): string {
  if (!myData) return '';
  const params = new URLSearchParams(
    Object.entries(myData)
      .filter(([, v]) => v !== undefined && v !== null) // 이렇게 수정
      .map(([k, v]) => [k, String(v)])
  );
  return `https://soft-biscochitos-d88b76.netlify.app/?${params.toString()}`;
}

export default function CenteredQRCode() {
  const { myData } = useResource();
  const randomData = getRandomString(myData);

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      textAlign: 'center',
      padding: '20px',
    }}>
      {randomData && (
        <div style={{
          border: '8px solid white',
          padding: '10px',
          borderRadius: '12px',
          backgroundColor: 'white',
        }}>
          <QRCode value={randomData} size={200} />
        </div>
      )}
      <p style={{ marginTop: '20px', fontSize: '18px' }}>
        QR코드로 찍으면 개인적으로 정보를 볼 수 있습니다!
      </p>
      <p style={{ marginTop: '10px', fontSize: '16px', color: '#cccccc' }}>
        다음으로 넘길 경우 초기 화면으로 돌아갑니다.
      </p>
    </div>
  );
}

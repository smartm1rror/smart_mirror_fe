'use client';

import QRCode from 'react-qr-code';

function getRandomString(): string {
  const result = 'https://www.naver.com/';
  return result;
}


export default function CenteredQRCode() {
  const randomData = getRandomString();

  return (
    <div style={{
      backgroundColor: 'black',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      textAlign: 'center',
      padding: '20px',
    }}>
      <div style={{
        border: '8px solid white',
        padding: '10px',
        borderRadius: '12px',
        backgroundColor: 'white',
      }}>
        <QRCode value={randomData} size={200} />
      </div>
      <p style={{ marginTop: '20px', fontSize: '18px' }}>
        QR코드로 찍으면 폰으로 볼 수 있습니다.
      </p>
      <p style={{ marginTop: '10px', fontSize: '16px', color: '#cccccc' }}>
        아래로 스와이프하면 화면이 꺼집니다
      </p>
    </div>
  );
}

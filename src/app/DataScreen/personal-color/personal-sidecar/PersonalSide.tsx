// components/PersonalColorPanel.tsx
import React from 'react';

type PersonalColorPanelProps = {
  colors: string[];
  title: string;
  description: string;
};

const PersonalColorPanel: React.FC<PersonalColorPanelProps> = ({
  colors,
  title,
  description,
}) => {
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
    }}>
      {/* 왼쪽: 컬러 블럭 */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1vh', // 간격을 좁게
        padding: '10vh 0',
      }}>
        {colors.map((color, idx) => (
          <div
            key={idx}
            style={{
              width: '23vw',          // 더 넓게
              height: '5.5vh',         // 더 높게
              background: color,
              borderRadius: '0.7vw',
              boxShadow: '0 2px 16px rgba(0,0,0,0.10)'
            }}
          />
        ))}
      </div>
      {/* 오른쪽: 텍스트 영역 */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '8vh 4vw',
      }}>
        <div style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          marginBottom: '3vh',
          letterSpacing: '0.05em',
        }}>
          {title}
        </div>
        <div style={{
          fontSize: '1.25rem',
          lineHeight: 1.7,
          maxWidth: '50vw',
        }}>
          {description}
        </div>
      </div>
    </div>
  );
};

export default PersonalColorPanel;

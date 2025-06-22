// 퍼스널 컬러 팔레트 타입 정의
export interface PersonalColorPalette {
  key: string; // 영문 키 (예: 'spring_bright')
  name: string; // 한글명 (예: '봄 웜톤 (Spring Bright)')
  description: string; // 3~4줄 설명
  colors: string[]; // 대표 색상 12개 HEX
}

// 12가지 퍼스널 컬러 팔레트 데이터
export const personalColorPalettes: PersonalColorPalette[] = [
  {
    // key: 'spring_bright',
    key: 'spring',
    // name: '봄 웜톤 (Spring Bright)',
    name: '봄 톤 (Spring Tone)',
    description:
      '맑고 밝은 느낌의 컬러가 잘 어울리는 타입입니다. 노란빛이 감도는 따뜻한 컬러, 생기 있고 경쾌한 색상이 얼굴을 더욱 화사하게 만들어줍니다. 대표 컬러는 라이트 옐로우, 코랄, 민트, 라벤더 등이 있습니다.',
    colors: [
      '#FFD966', '#FFB6B9', '#B5EAD7', '#C7CEEA',
      '#FFDAC1', '#E2F0CB', '#FFE4B5', '#FF7F50',
      '#98FB98', '#DDA0DD', '#FFFACD', '#F08080'
    ]
  },
  {
    key: 'spring_warm',
    name: '봄 웜톤 (Spring Warm)',
    description:
      '따뜻하고 생기 있는 컬러가 어울리는 타입입니다. 밝고 따뜻한 오렌지, 코랄, 골드 톤이 얼굴을 화사하게 만들어줍니다. 대표 컬러는 골드, 코랄, 살구색 등이 있습니다.',
    colors: [
      '#FFD700', '#FF6347', '#FFA07A', '#FF8C00',
      '#F4A460', '#FF4500', '#FFE4B5', '#FF7F50',
      '#FFDEAD', '#FA8072', '#FFDAB9', '#FFEBCD'
    ]
  },
  {
    key: 'spring_light',
    name: '봄 라이트 (Spring Light)',
    description:
      '밝고 부드러운 컬러가 어울리는 타입입니다. 연한 옐로우, 라이트 핑크, 민트 톤이 얼굴을 환하게 만들어줍니다. 대표 컬러는 라이트 옐로우, 라이트 핑크, 민트 등이 있습니다.',
    colors: [
      '#FFFACD', '#FFB6C1', '#98FB98', '#E0FFFF',
      '#F0E68C', '#FFDAB9', '#FFEFD5', '#F5DEB3',
      '#FFF0F5', '#E6E6FA', '#F0FFF0', '#FAFAD2'
    ]
  },
  {
    // key: 'summer_cool',
    key: 'summer',
    // name: '여름 쿨톤 (Summer Cool)',
    name: '여름 톤 (Summer Tone)',
    description:
      '차분하고 시원한 컬러가 어울리는 타입입니다. 블루, 라벤더, 그레이 톤이 얼굴을 부드럽고 세련되게 만들어줍니다. 대표 컬러는 라벤더, 블루, 그레이 등이 있습니다.',
    colors: [
      '#B0C4DE', '#ADD8E6', '#E6E6FA', '#D8BFD8',
      '#778899', '#708090', '#6A5ACD', '#8470FF',
      '#B0E0E6', '#AFEEEE', '#E0FFFF', '#F0F8FF'
    ]
  },
  {
    key: 'summer_light',
    name: '여름 라이트 (Summer Light)',
    description:
      '밝고 부드러운 컬러가 어울리는 타입입니다. 연한 블루, 라벤더, 핑크 톤이 얼굴을 환하게 만들어줍니다. 대표 컬러는 라이트 블루, 라벤더, 핑크 등이 있습니다.',
    colors: [
      '#ADD8E6', '#E6E6FA', '#FFB6C1', '#F0E68C',
      '#E0FFFF', '#F5F5DC', '#FFF0F5', '#E6E6FA',
      '#F0FFF0', '#FAFAD2', '#D8BFD8', '#DDA0DD'
    ]
  },
  {
    key: 'summer_soft',
    name: '여름 소프트 (Summer Soft)',
    description:
      '부드럽고 은은한 컬러가 어울리는 타입입니다. 그레이, 라벤더, 소프트 블루 톤이 얼굴을 차분하게 만들어줍니다. 대표 컬러는 그레이, 라벤더, 소프트 블루 등이 있습니다.',
    colors: [
      '#B6B6B4', '#C3C3E6', '#D3D3D3', '#D8BFD8',
      '#A9A9A9', '#B0C4DE', '#AFEEEE', '#E0FFFF',
      '#F0F8FF', '#DDA0DD', '#E6E6FA', '#C0C0C0'
    ]
  },
  {
    // key: 'autumn_deep',
    key: 'autumn',
    // name: '가을 딥 (Autumn Deep)',
    name: '가을 톤 (Autumn Tone)',
    description:
      '깊고 진한 컬러가 어울리는 타입입니다. 다크 브라운, 올리브, 버건디 톤이 얼굴을 따뜻하고 고급스럽게 만들어줍니다. 대표 컬러는 다크 브라운, 올리브, 버건디 등이 있습니다.',
    colors: [
      '#654321', '#556B2F', '#800000', '#8B0000',
      '#A0522D', '#B22222', '#CD5C5C', '#D2691E',
      '#8B4513', '#A52A2A', '#5F9EA0', '#6B8E23'
    ]
  },
  {
    key: 'autumn_soft',
    name: '가을 소프트 (Autumn Soft)',
    description:
      '부드럽고 따뜻한 컬러가 어울리는 타입입니다. 머스타드, 테라코타, 올리브 톤이 얼굴을 부드럽고 자연스럽게 만들어줍니다. 대표 컬러는 머스타드, 테라코타, 올리브 등이 있습니다.',
    colors: [
      '#FFDB58', '#E2725B', '#808000', '#BDB76B',
      '#D2B48C', '#C68642', '#F4A460', '#DEB887',
      '#BC8F8F', '#CD853F', '#8F9779', '#A0522D'
    ]
  },
  {
    key: 'autumn_warm',
    name: '가을 웜톤 (Autumn Warm)',
    description:
      '따뜻하고 풍부한 컬러가 어울리는 타입입니다. 오렌지, 브라운, 머스타드 톤이 얼굴을 따뜻하고 생기 있게 만들어줍니다. 대표 컬러는 오렌지, 브라운, 머스타드 등이 있습니다.',
    colors: [
      '#FF8C00', '#A0522D', '#D2691E', '#CD853F',
      '#FF7F50', '#FF6347', '#FFA07A', '#F4A460',
      '#DEB887', '#B22222', '#8B4513', '#D2B48C'
    ]
  },
  {
    // key: 'winter_bright',
    key: 'winter',
    // name: '겨울 브라이트 (Winter Bright)',
    name: '겨울 톤 (Winter Tone)',
    description:
      '선명하고 강렬한 컬러가 어울리는 타입입니다. 블랙, 화이트, 레드, 블루 톤이 얼굴을 뚜렷하고 세련되게 만들어줍니다. 대표 컬러는 블랙, 화이트, 레드, 블루 등이 있습니다.',
    colors: [
      '#000000', '#FFFFFF', '#FF0000', '#0000FF',
      '#1E90FF', '#DC143C', '#8B0000', '#00BFFF',
      '#FF4500', '#2F4F4F', '#708090', '#A9A9A9'
    ]
  },
  {
    key: 'winter_cool',
    name: '겨울 쿨톤 (Winter Cool)',
    description:
      '차갑고 선명한 컬러가 어울리는 타입입니다. 블루, 그레이, 화이트 톤이 얼굴을 시원하고 세련되게 만들어줍니다. 대표 컬러는 블루, 그레이, 화이트 등이 있습니다.',
    colors: [
      '#4682B4', '#5F9EA0', '#B0C4DE', '#D3D3D3',
      '#778899', '#708090', '#F0F8FF', '#E6E6FA',
      '#AFEEEE', '#B0E0E6', '#ADD8E6', '#F5F5F5'
    ]
  },
  {
    key: 'winter_deep',
    name: '겨울 딥 (Winter Deep)',
    description:
      '깊고 어두운 컬러가 어울리는 타입입니다. 다크 네이비, 다크 그린, 블랙 톤이 얼굴을 강렬하고 고급스럽게 만들어줍니다. 대표 컬러는 다크 네이비, 다크 그린, 블랙 등이 있습니다.',
    colors: [
      '#000080', '#013220', '#000000', '#2F4F4F',
      '#191970', '#00008B', '#4B0082', '#2E0854',
      '#1C1C1C', '#3B3B3B', '#5A5A5A', '#696969'
    ]
  }
];

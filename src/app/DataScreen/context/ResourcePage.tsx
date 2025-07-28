'use client';

import { SetStateAction, useEffect, useRef, useState } from 'react';
import SkinStatusPage from '../skin-status/page';
import SkinDiagnosisPage from '../skin-diagnosis/page';
import PersonalColorPage from '../personal-color/page';
import QRCodePage from '../qr-code/page';
import { useResource } from './ResourceContext'; // useResource 임포트
import { MotionEvent } from '../types'; // MotionEvent는 필요 없지만, 혹시 모를 경우를 위해 남겨둠
import ScrollHelper from '../scrollhelper/page';
import './styles.css';

export default function ResourcePage() {
  const { move_page_event, setMovePageEvent } = useResource(); // ResourceContext에서 move_page_event와 setMovePageEvent를 가져옴

  const [pageIndex, setPageIndex] = useState(0); // 현재 페이지 인덱스
  const [direction, setDirection] = useState(0); // -1: left, 1: right
  const [animating, setAnimating] = useState(false); // 애니메이션 중인지 여부
  const [slideClass, setSlideClass] = useState('slide slide-center'); // 슬라이드 애니메이션 클래스
  const prevPageIndex = useRef(pageIndex); // 이전 페이지 인덱스를 저장 (애니메이션에 사용)

  // 페이지 컴포넌트들
  const pages = [
    <ScrollHelper key="page0" />,
    <SkinStatusPage key="page1" />,
    <SkinDiagnosisPage key="page2" />,
    <PersonalColorPage key="page3" />,
    <QRCodePage key="page4" />
  ];

  // ResourceContext의 move_page_event 상태를 감지하여 페이지 전환
  useEffect(() => {
    // ResourceContext의 totalPages와 currentPage를 ResourceContext에서 직접 관리하도록 하여
    // ResourcePage에서는 단순히 이 값에 따라 페이지를 렌더링하도록 변경합니다.
    // ResourcePage는 이제 직접적인 paginate 로직을 실행하는 대신,
    // move_page_event가 "페이지 전환" 신호로 사용됩니다.
    
    // 중요한 점: ResourceContext에서 setMovePageEvent(MotionEvent.RIGHT_EFFECT)를 호출할 때
    // 이곳에서 이를 감지하고 실제 페이지 인덱스를 변경해야 합니다.
    
    // move_page_event가 RIGHT_EFFECT일 경우 다음 페이지로 이동
    if (move_page_event === MotionEvent.RIGHT_EFFECT && !animating) {
        const currentIndex = pageIndex;
        let nextPage = currentIndex + 1; // 무조건 다음 페이지로
        
        // 마지막 페이지 처리: ResourceContext의 totalPages와 연동하여 수정 필요
        // 현재 pages 배열의 길이를 totalPages로 간주
        const totalPages = pages.length;

        if (nextPage >= totalPages) {
            // 마지막 페이지에 도달하면 초기 페이지로 돌아가거나 특정 동작 수행
            // 예: 첫 페이지로 돌아가기
            nextPage = 0; 
            console.log("마지막 페이지 도달. 첫 페이지로 돌아갑니다.");
        }

        setDirection(1); // 오른쪽으로 이동
        setSlideClass('slide slide-enter-left');
        setAnimating(true);

        setTimeout(() => {
            prevPageIndex.current = nextPage;
            setPageIndex(nextPage);
            setSlideClass('slide slide-center');
            setTimeout(() => setAnimating(false), 400); // 애니메이션 종료 후 animating 상태 초기화
        }, 400);

        setMovePageEvent(MotionEvent.NONE); // 이벤트 처리 후 초기화
    }
  }, [move_page_event, animating, pageIndex, pages.length, setMovePageEvent]);


  // 기존의 paginate, edgeEffect 로직은 자동 전환 시에는 불필요하지만,
  // 수동 터치/드래그 기능을 유지하고 싶다면 남겨둡니다.
  // 여기서는 자동 전환에 초점을 맞춰 필요한 부분만 남기고 정리하겠습니다.

  // 터치/드래그 (모바일 대응) - 이 부분은 자동 전환과 무관하게 유지 가능
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 60) {
      // 수동 페이지 이동 로직 (자동 전환과 별개로 작동)
      const newDirection = diff < 0 ? 1 : -1; // -1: 왼쪽 스와이프 (다음 페이지), 1: 오른쪽 스와이프 (이전 페이지)
      
      const currentIndex = pageIndex;
      let nextPage = currentIndex + newDirection;

      // 마지막 페이지에서 오른쪽으로 스와이프 시 첫 페이지로 이동 또는 특정 동작
      if (currentIndex === pages.length - 1 && newDirection === 1) {
          window.location.href = "/"; // 메인 페이지로 이동 (예시)
          return;
      }
      
      // 첫 페이지에서 왼쪽으로 스와이프 시
      if (currentIndex === 0 && newDirection === -1) {
          // 아무것도 하지 않거나, 마지막 페이지로 이동 등
          setSlideClass(`slide shake-left`); // 엣지 효과
          setAnimating(true);
          setTimeout(() => {
            setSlideClass('slide slide-center');
            setAnimating(false);
          }, 400);
          return;
      }


      if (nextPage < 0) nextPage = 0;
      if (nextPage >= pages.length) nextPage = pages.length - 1;

      if (nextPage === currentIndex) {
        // 현재 페이지와 같으면 엣지 효과
        setSlideClass(`slide shake-${newDirection === -1 ? "left" : "right"}`);
        setAnimating(true);
        setTimeout(() => {
          setSlideClass('slide slide-center');
          setAnimating(false);
        }, 400);
        return;
      }

      setDirection(newDirection);
      setSlideClass(`slide ${newDirection === 1 ? 'slide-enter-left' : 'slide-enter-right'}`);
      setAnimating(true);

      setTimeout(() => {
        prevPageIndex.current = nextPage;
        setPageIndex(nextPage);
        setSlideClass('slide slide-center');
        setTimeout(() => setAnimating(false), 400);
      }, 400);
    }
    touchStartX.current = null;
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* <button ...> // 필요시 버튼 추가 */}
      <div
        className="w-full h-full"
        style={{ position: 'relative', overflow: 'hidden' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className={slideClass} style={{ position: 'absolute', width: '100%', height: '100%' }}>
          {pages[pageIndex]}
        </div>
      </div>
    </div>
  );
}
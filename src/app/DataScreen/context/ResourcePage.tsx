'use client';

import { SetStateAction, useEffect, useRef, useState } from 'react';
import SkinStatusPage from '../skin-status/page';
import SkinDiagnosisPage from '../skin-diagnosis/page';
import PersonalColorPage from '../personal-color/page';
import QRCodePage from '../qr-code/page';
import { useResource } from './ResourceContext';
import { MotionEvent } from '../types';
import ScrollHelper from '../scrollhelper/page';
import './styles.css';

export default function ResourcePage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1: left, 1: right
  const [animating, setAnimating] = useState(false);
  const { move_page_event, setMovePageEvent } = useResource();
  const [edgeEffect, setEdgeEffect] = useState('none');
  const [slideClass, setSlideClass] = useState('slide slide-center');
  const prevPageIndex = useRef(pageIndex);

  const pages = [
    <ScrollHelper key="page0" />,
    <SkinStatusPage key="page1" />,
    <SkinDiagnosisPage key="page2" />,
    <PersonalColorPage key="page3" />,
    <QRCodePage key="page4" />
  ];

  // 페이지 이동
  const paginate = (newDirection: number) => {
    if (animating) return;

    const currentIndex = pageIndex;
    let nextPage = currentIndex + newDirection;

    if (currentIndex === pages.length - 1 && newDirection === 1) {
      window.location.href = "/";
      return;
    }

    if (nextPage < 0) nextPage = 0;
    if (nextPage >= pages.length) nextPage = pages.length - 1;

    if (nextPage === currentIndex) {
      setEdgeEffect(newDirection === -1 ? "left" : "right");
      return;
    }

    setDirection(newDirection);
    setSlideClass(`slide ${newDirection === 1 ? 'slide-enter-left' : 'slide-enter-right'}`);
    setAnimating(true);

    setTimeout(() => {
      prevPageIndex.current = nextPage;
      setPageIndex(nextPage);
      setSlideClass('slide slide-center');
      setTimeout(() => setAnimating(false), 400); // 애니메이션 끝나고
    }, 400);
  };

  // 엣지 효과
  useEffect(() => {
    if (edgeEffect === "none") return;
    setSlideClass(`slide shake-${edgeEffect}`);
    setAnimating(true);
    setTimeout(() => {
      setSlideClass('slide slide-center');
      setEdgeEffect("none");
      setAnimating(false);
    }, 400);
  }, [edgeEffect]);

  // move_page_event 처리
  useEffect(() => {
    if (animating) return;

    if (move_page_event !== MotionEvent.NONE) {
      if (move_page_event === MotionEvent.LEFT_EFFECT) {
        setEdgeEffect("left");
      }
      else if (move_page_event === MotionEvent.RIGHT_EFFECT) {
        setEdgeEffect("right");
      }
      else if (move_page_event === MotionEvent.LEFT || move_page_event === MotionEvent.RIGHT) {
        const newDirection = move_page_event === MotionEvent.LEFT ? -1 : 1;
        paginate(newDirection);
      }
      setMovePageEvent(MotionEvent.NONE);
    }
  }, [move_page_event, animating]);

  // 터치/드래그 (모바일 대응)
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 60) {
      paginate(diff < 0 ? 1 : -1);
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

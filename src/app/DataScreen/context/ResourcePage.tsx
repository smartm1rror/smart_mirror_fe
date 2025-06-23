'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SkinStatusPage from '../skin-status/page';
import SkinDiagnosisPage from '../skin-diagnosis/page';
import PersonalColorPage from '../personal-color/page';
import QRCodePage from '../qr-code/page';
import { useResource } from './ResourceContext';
import { MotionEvent } from '../types';
import ScrollHelper from '../scrollhelper/page';

export default function ResourcePage() {
    const [[pageIndex, direction], setPage] = useState<[number, number]>([0, 0]);
    const [isAnimating, setIsAnimating] = useState(false);
    const { move_page_event, setMovePageEvent } = useResource();
    const [edgeEffect, setEdgeEffect] = useState<"none" | "left" | "right">("none");

    useEffect(() => {
        // 애니메이션 중이면 아무 동작도 하지 않음
        if (isAnimating) return;

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
    }, [move_page_event, isAnimating]);


    const pages = [
        <ScrollHelper key="page" />,
        <SkinStatusPage key="page" />,
        <SkinDiagnosisPage key="page" />,
        <PersonalColorPage key="page" />,
        <QRCodePage key="page" />
    ];

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
        }),
        center: {
            zIndex: 1,
            x: 0,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? '100%' : '-100%',
        }),
        shakeLeft: {
            x: [0, -10, 10, -10, 10, 0],
            transition: { duration: 0.4, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }
        },
        shakeRight: {
            x: [0, 10, -10, 10, -10, 0],
            transition: { duration: 0.4, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }
        }

    };


    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };



    const paginate = (newDirection: number) => {
        if (isAnimating) return;

        setIsAnimating(true);

        // page는 [인덱스, 방향] 구조임
        const currentIndex = pageIndex;
        let nextPage = currentIndex + newDirection;

        if (currentIndex === pages.length - 1 && newDirection === 1) {
            window.location.href = "/";
            return;
        }

        // Clamp: 범위 벗어나면 가장 가까운 값으로 고정
        if (nextPage < 0) nextPage = 0;
        if (nextPage >= pages.length) nextPage = pages.length - 1;

        // 만약 이동이 없는 경우(같은 페이지)면 애니메이션도 안 하게 리턴
        if (nextPage === currentIndex) {
            setIsAnimating(false);
            return;
        }

        setPage([nextPage, newDirection]);
    };


    return (
        <div className="relative h-screen w-screen overflow-hidden">
            {/* 버튼 구현 부는 나중에 주석 처리 할 것 : 편의상 넣은 거임*/}
            {/* <button
                onClick={() => paginate(-1)}
                className="absolute left-4 top-1/2 z-20 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
                disabled={pageIndex === 0 || isAnimating}
            >
                ←
            </button>
            <button
                onClick={() => paginate(1)}
                className="absolute right-4 top-1/2 z-20 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
                disabled={pageIndex === pages.length - 1 || isAnimating}
            >
                →
            </button> */}

            <div className="w-full h-full">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={pageIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate={
                            edgeEffect === "left"
                                ? "shakeLeft"
                                : edgeEffect === "right"
                                    ? "shakeRight"
                                    : "center"
                        }
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 500, damping: 30, duration: 0.2 },
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }}
                        onAnimationComplete={() => {
                            setIsAnimating(false);
                            if (edgeEffect !== "none") setEdgeEffect("none");
                        }}
                        className="w-full h-full absolute"
                    >
                        {pages[pageIndex]}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
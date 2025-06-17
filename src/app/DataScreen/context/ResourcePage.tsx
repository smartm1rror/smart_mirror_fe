'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SkinStatusPage from '../skin-status/page';
import SkinCarePage from '../skin-care/page';
import SkinDiagnosisPage from '../skin-diagnosis/page';
import PersonalColorPage from '../personal-color/page';
import QRCodePage from '../qr-code/page';

export default function ResourcePage() {
    const [[page, direction], setPage] = useState([0, 0]);
    const [isAnimating, setIsAnimating] = useState(false);

    const pages = [
        <SkinStatusPage key="page" />,
        <SkinCarePage key="page" />,
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
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = async (newDirection: number) => {
        if (isAnimating) return;

        setIsAnimating(true);
        const nextPage = page + newDirection;

        if (nextPage >= 0 && nextPage < pages.length) {
            setPage([nextPage, newDirection]);
        }
    };

    return (
        <div className="relative h-screen w-screen overflow-hidden">
            {/* 버튼 구현 부는 나중에 주석 처리 할 것 : 편의상 넣은 거임*/}
            <button
                onClick={() => paginate(-1)}
                className="absolute left-4 top-1/2 z-20 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
                disabled={page === 0 || isAnimating}
            >
                ←
            </button>
            <button
                onClick={() => paginate(1)}
                className="absolute right-4 top-1/2 z-20 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
                disabled={page === pages.length - 1 || isAnimating}
            >
                →
            </button>

            <div className="w-full h-full">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={page}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
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
                        onAnimationComplete={() => setIsAnimating(false)}
                        className="w-full h-full absolute"
                    >
                        {pages[page]}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
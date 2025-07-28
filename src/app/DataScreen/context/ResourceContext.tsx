"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { MotionEvent, ResourceContextType } from "../types"; // types.ts 파일에 MotionEvent와 ResourceContextType 정의가 필요합니다.

const ResourceContext = createContext<ResourceContextType | undefined>(undefined);

export const ResourceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [motion_event, setEvent] = useState<ResourceContextType["motion_event"]>(MotionEvent.NONE);
  const [motion_timer, setTimer] = useState<number>(0);
  const [move_page_event, setMovePageEvent] = useState<ResourceContextType["move_page_event"]>(MotionEvent.NONE);
  const [currentPage, setCurrentPage] = useState<number>(0); // 현재 페이지 인덱스 추가
  const totalPages = 5; // 전체 페이지 수 (0부터 시작하므로, 페이지 0~5까지 총 6개)

  const [myData, setMyData] = useState<ResourceContextType["myData"]>(() => ({
    acne_level: 1,
    confidence: 0,
    pc_confidence: "0%",
    personal_color: "정보 없음", // <-- 이 부분을 'c_color'에서 'personal_color'로 수정했습니다.
    skin_lv: 1,
    last_acnc_level: 1,
  }));

  const value: ResourceContextType = {
    motion_event,
    setEvent,
    motion_timer,
    setTimer,
    myData,
    setMyData,
    move_page_event,
    setMovePageEvent,
  };

  function convertAcneLevelToScore(acne_level: number): number {
    const base = (5 - acne_level) * 2.5;
    const noise = (Math.random() - 0.5) * 1.5; // -0.75 ~ +0.75
    const level = Math.round(base + noise);
    return Math.max(0, Math.min(10, level)); // 0~10 범위로 clamp
  }

  useEffect(() => {
    const savedData = localStorage.getItem("myData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);

      // 'personal_color' 키로 데이터가 저장되어 있다고 가정하고 파싱합니다.
      // `myData` 상태의 초기값과 `parsedData`의 키가 일치해야 합니다.
      parsedData.acne_level = convertAcneLevelToScore(parsedData.acne_level);
      parsedData.confidence = Math.max(0, Math.min(100, parsedData.confidence));
      parsedData.pc_confidence = parsedData.pc_confidence || "0%";
      parsedData.personal_color = parsedData.personal_color || "정보 없음"; // <-- 'personal_color'로 사용
      parsedData.skin_lv = parsedData.skin_lv || 1;
      parsedData.last_acnc_level = parsedData.last_acnc_level || 1; // 추가: last_acnc_level 기본값 설정

      setMyData(parsedData);

      // test
      console.log("acne_level:", parsedData.acne_level);
      console.log("confidence:", parsedData.confidence);
      console.log("pc_confidence:", parsedData.pc_confidence);
      console.log("personal_color:", parsedData.personal_color);
      console.log("skin_lv:", parsedData.skin_lv);
    }
  }, []);

  // 5초마다 페이지를 자동으로 넘기는 로직
  useEffect(() => {
    // 현재 페이지가 마지막 페이지 (인덱스 totalPages - 1)가 아닐 때만 자동 전환 타이머 설정
    if (currentPage < totalPages - 1) {
      const pageTimer = setTimeout(() => {
        setCurrentPage((prevPage) => prevPage + 1);
        // 다음 페이지로 넘어가는 효과를 알림
        setMovePageEvent(MotionEvent.RIGHT_EFFECT);
        console.log(`페이지 전환: ${currentPage} -> ${currentPage + 1}`);
      }, 5000); // 5초 (5000ms)

      return () => clearTimeout(pageTimer); // 컴포넌트 언마운트 시 타이머 정리
    } else {
      // 현재 페이지가 마지막 페이지 (인덱스 totalPages - 1)인 경우
      console.log("마지막 페이지입니다. 10초 후 메인 페이지로 이동합니다.");
      // 마지막 페이지에서 10초 대기 후 '/'로 리다이렉트
      const redirectTimer = setTimeout(() => {
        window.location.href = "/"; // 메인 페이지로 리다이렉트
      }, 10000); // 10초 (10000ms)

      setMovePageEvent(MotionEvent.NONE); // 마지막 페이지에서는 특정 효과 없이 대기

      return () => clearTimeout(redirectTimer); // 타이머 정리
    }
  }, [currentPage, totalPages]); // currentPage와 totalPages가 변경될 때마다 실행

  // 이 useEffect는 현재 페이지가 변경될 때마다 특정 애니메이션 효과를 주는 용도로 사용 가능합니다.
  // 현재 자동 전환 로직에서 이미 move_page_event를 설정하고 있으므로, 이 부분은 필요에 따라 추가/수정하세요.
  useEffect(() => {
    // 예: 페이지 전환 시 특정 효과를 줄 경우
    // if (currentPage > 0 && currentPage < totalPages) {
    //   setMovePageEvent(MotionEvent.PAGE_CHANGE_ANIMATION);
    // }
  }, [currentPage]);


  return (
    <ResourceContext.Provider value={value}>
      {children}
    </ResourceContext.Provider>
  );
};

export const useResource = () => {
  const ctx = useContext(ResourceContext);
  if (!ctx) throw new Error("useResource must be used within ResourceProvider");
  return ctx;
};
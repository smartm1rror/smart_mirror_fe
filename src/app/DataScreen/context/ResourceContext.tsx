"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { MotionEvent, ResourceContextType } from "../types";

const ResourceContext = createContext<ResourceContextType | undefined>(undefined);

export const ResourceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [motion_event, setEvent] = useState<ResourceContextType["motion_event"]>(MotionEvent.NONE);
  const [motion_timer, setTimer] = useState<number>(0);
  const [move_page_event, setMovePageEvent] = useState<ResourceContextType["move_page_event"]>(MotionEvent.NONE);
  const [myData, setMyData] = useState<ResourceContextType["myData"]>(() => ({
    acne_level: 1,
    confidence: 0,
    pc_confidence: "0%",
    personal_color: "정보 없음",
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

      // acne_level는 위에 convertAcneLevelToScore 함수로 변환해서 저장 및 이는 setMyData로 상태에 저장
      parsedData.acne_level = convertAcneLevelToScore(parsedData.acne_level);
      parsedData.confidence = Math.max(0, Math.min(100, parsedData.confidence));
      parsedData.pc_confidence = parsedData.pc_confidence || "0%";
      parsedData.personal_color = parsedData.personal_color || "정보 없음";
      parsedData.skin_lv = parsedData.skin_lv || 1;

      setMyData(parsedData);

      // test
      console.log("acne_level:", parsedData.acne_level);
      console.log("confidence:", parsedData.confidence);
      console.log("pc_confidence:", parsedData.pc_confidence);
      console.log("personal_color:", parsedData.personal_color);
      console.log("skin_lv:", parsedData.skin_lv);
    }
  }, []);

  useEffect(() => {
    if (motion_timer === 30) {
      console.log("Motion timer reached 30 milliseconds");

      if (motion_event === MotionEvent.LEFT) {
        setMovePageEvent(MotionEvent.LEFT_EFFECT);
      }
      else {
        setMovePageEvent(MotionEvent.RIGHT_EFFECT);
      }
    }

    if (motion_timer > 90) {
      console.log("Motion timer reached 90 milliseconds");
      console.log("Current motion event:", motion_event);

      setMovePageEvent(motion_event);

      setTimer(0);
      setEvent(MotionEvent.NONE);
      return;
    }

    const timeout = setTimeout(() => {
      console.log("Motion timer:", motion_timer);
      setTimer(0);
      setEvent(MotionEvent.NONE);
    }, 1000);

    return () => clearTimeout(timeout);

  }, [motion_timer]);

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
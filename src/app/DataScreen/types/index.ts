import React from "react";

export interface ResourceContextType {
    // motion_event = "none" | "left" | "right"
    motion_event: MotionEvent;
    setEvent: React.Dispatch<React.SetStateAction<MotionEvent>>;
    motion_timer: number;
    setTimer: React.Dispatch<React.SetStateAction<number>>;

    myData: myData; // 사용자 데이터, 초기값은 null
    setMyData: React.Dispatch<React.SetStateAction<myData>>;

    // Move Page Event
    move_page_event: MotionEvent;
    setMovePageEvent: React.Dispatch<React.SetStateAction<MotionEvent>>;
}

export enum MotionEvent {
    NONE = "none",
    LEFT = "left",
    RIGHT = "right",
    LEFT_EFFECT = "left_effect",
    RIGHT_EFFECT = "right_effect"
}

export interface myData {
  acne_level: number;
  confidence: number;
  pc_confidence: string; // "95.04%"처럼 퍼센트 문자열로 받을 경우
  personal_color: string;
  skin_lv: number | string; // 아래 참고
}

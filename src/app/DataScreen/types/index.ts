import React from "react";

export interface ResourceContextType {
    // motion_event = "none" | "left" | "right"
    motion_event: MotionEvent;
    setEvent: React.Dispatch<React.SetStateAction<MotionEvent>>;
    motion_timer: number;
    setTimer: React.Dispatch<React.SetStateAction<number>>;

    // Move Page Event
    move_page_event: MotionEvent;
    setMovePageEvent: React.Dispatch<React.SetStateAction<MotionEvent>>;
}

export enum MotionEvent {
    NONE = "none",
    LEFT = "left",
    RIGHT = "right"
}
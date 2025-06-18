"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { MotionEvent, ResourceContextType } from "../types";

const ResourceContext = createContext<ResourceContextType | undefined>(undefined);

export const ResourceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [motion_event, setEvent] = useState<ResourceContextType["motion_event"]>(MotionEvent.NONE);
  const [motion_timer, setTimer] = useState<number>(0);
  const [move_page_event, setMovePageEvent] = useState<ResourceContextType["move_page_event"]>(MotionEvent.NONE);

  const value: ResourceContextType = {
    motion_event,
    setEvent,
    motion_timer,
    setTimer,
    move_page_event,
    setMovePageEvent,
  };

  useEffect(() => {
    if (motion_timer === 50) {
      console.log("Motion timer reached 50 milliseconds");
    }

    if (motion_timer > 140) {
      console.log("Motion timer reached 140 milliseconds");
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
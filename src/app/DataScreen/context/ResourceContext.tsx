"use client";

import { createContext, useState } from "react";
import { ResourceContextType } from "../types";

const ResourceContext = createContext<ResourceContextType | undefined>(undefined);

export const ResourceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [event, setEvent] = useState<string | undefined>(undefined);

  const value: ResourceContextType = {
    event,
  };

  return (
    <ResourceContext.Provider value={value}>
      {children}
    </ResourceContext.Provider>
  );
};
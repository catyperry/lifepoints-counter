'use client';
import React from 'react';

const Context = React.createContext<{
  awake1: boolean;
  setAwake1: React.Dispatch<React.SetStateAction<boolean>>;
  awake2: boolean;
  setAwake2: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export const SleepingAgent = ({ children }: { children: React.ReactNode }) => {
  const [awake1, setAwake1] = React.useState(false);
  const [awake2, setAwake2] = React.useState(false);

  return <Context.Provider value={{ awake1, setAwake1, awake2, setAwake2 }}>{children}</Context.Provider>;
};

export const useSleepingAgent = () => {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error('useSleepingAgent must be used within a SleepingAgent');
  }
  return context;
};

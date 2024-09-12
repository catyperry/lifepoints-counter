import React from 'react';
import { SleepingAgent } from './components/SleepingAgent';
import { Main } from './components/Main';

export default function Home() {
  return (
    <div className="h-dvh font-[family-name:var(--font-geist-sans)]">
      <SleepingAgent>
        <Main />
      </SleepingAgent>
    </div>
  );
}

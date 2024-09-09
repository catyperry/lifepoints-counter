import React from 'react';
import { Counter } from './components/Counter';

export default function Home() {
  return (
    <div className="h-svh font-[family-name:var(--font-geist-sans)]">
      <main className="h-full w-full">
        <div className="relative h-1/2 w-full">
          <Counter />
        </div>
      </main>
    </div>
  );
}

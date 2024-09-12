'use client';

import React from 'react';
import { Counter } from './Counter';
import { useSleepingAgent } from './SleepingAgent';
import { CoinFlip } from './CoinFlip';
import { IconButton } from './Button';
import Image from 'next/image';

export function Main() {
  const { awake1, setAwake1, awake2, setAwake2 } = useSleepingAgent();
  const [showCoinButton, setShowCoinButton] = React.useState(false);
  const [flipCoin, setFlipCoin] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const startSleepTimer = () => {
    timeoutRef.current = setTimeout(() => {
      setShowCoinButton(false);
    }, 3000);
  };

  return (
    <main className="flex h-full w-full flex-col items-center">
      <div className="w-full flex-1 rotate-180 pt-5">
        <Counter
          awake={awake1}
          setAwake={(a) => {
            setAwake1(a);
            setAwake2(false);
            if (a) {
              setShowCoinButton(true);
              timeoutRef.current && clearTimeout(timeoutRef.current);
            } else {
              startSleepTimer();
            }
          }}
        />
      </div>

      {flipCoin && (
        <div className="absolute left-0 top-0 z-20 h-full w-full">
          <CoinFlip setFlipCoin={setFlipCoin} />
        </div>
      )}
      <div
        className={`absolute left-1/2 top-1/2 z-10 inline-flex -translate-x-1/2 -translate-y-1/2 ${flipCoin ? 'opacity-0' : ''}`}
      >
        <div
          className={`inline-flex transition-opacity ${showCoinButton ? '' : 'pointer-events-none opacity-0 duration-300'}`}
        >
          <IconButton onClick={() => setFlipCoin(true)}>
            <div>
              <Image src="/AnubisCoin_Front.webp" width="1000" height="1000" alt="Coin with Anubis displayed" />
            </div>
          </IconButton>
        </div>
      </div>
      <hr className="absolute left-0 top-1/2 w-full -translate-y-1/2 border-indigo-950" />
      <div className="w-full flex-1 pt-5">
        <Counter
          awake={awake2}
          setAwake={(a) => {
            setAwake2(a);
            setAwake1(false);
            if (a) {
              setShowCoinButton(true);
              timeoutRef.current && clearTimeout(timeoutRef.current);
            } else {
              startSleepTimer();
            }
          }}
        />
      </div>
    </main>
  );
}

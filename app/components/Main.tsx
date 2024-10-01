'use client';

import React from 'react';
import { Counter } from './Counter';
import { CoinFlip } from './CoinFlip';
import { IconButton } from './Button';
import Image from 'next/image';
import { RefreshCw } from 'lucide-react';

function getInitialPoints(id: string) {
  if (typeof window === 'undefined') {
    return 8000;
  }
  return sessionStorage.getItem(id) ? parseInt(sessionStorage.getItem(id)!) : 8000;
}

const animatedCount = ({
  points,
  setPoints,
  diff,
  sign,
}: {
  points: number;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  diff: number;
  sign: -1 | 1;
}) => {
  const stepTime = 20;
  const steps = 800 / stepTime;
  const stepSize = Math.floor(diff / steps);
  const result = Math.min(99999, Math.max(0, points + diff * sign));
  let currentStep = 0;
  const intervalId = setInterval(() => {
    currentStep++;
    setPoints((prev) => {
      const newValue = Math.min(99999, Math.max(0, prev + stepSize * sign));
      if (currentStep >= steps || (sign === -1 && newValue <= result) || (sign === 1 && newValue >= result)) {
        clearInterval(intervalId);
        return result;
      }
      return newValue;
    });
  }, stepTime);
};

export function Main() {
  const [points1, setPoints1] = React.useState(getInitialPoints('counter1'));
  const [points2, setPoints2] = React.useState(getInitialPoints('counter2'));
  const [awake1, setAwake1] = React.useState(false);
  const [awake2, setAwake2] = React.useState(false);
  const [showCoinButton, setShowCoinButton] = React.useState(false);
  const [flipCoin, setFlipCoin] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const startSleepTimer = () => {
    timeoutRef.current = setTimeout(() => {
      setShowCoinButton(false);
    }, 3000);
  };

  return (
    <main className="h-full w-full items-center">
      <div className="h-1/2 w-full rotate-180 pt-5">
        <Counter
          id="counter1"
          points={points1}
          animatedCount={(diff, sign) => animatedCount({ points: points1, setPoints: setPoints1, diff, sign })}
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
      <div
        className={`absolute left-4 top-1/2 z-10 -translate-y-1/2 transition-opacity ${awake1 || awake2 ? '' : 'pointer-events-none opacity-0'}`}
      >
        <IconButton
          onClick={() => {
            animatedCount({
              points: points1,
              setPoints: setPoints1,
              diff: Math.abs(8000 - points1),
              sign: points1 > 8000 ? -1 : 1,
            });
            animatedCount({
              points: points2,
              setPoints: setPoints2,
              diff: Math.abs(8000 - points2),
              sign: points2 > 8000 ? -1 : 1,
            });
            setAwake1(false);
            setAwake2(false);
          }}
        >
          <RefreshCw />
        </IconButton>
      </div>
      <hr className="absolute left-0 top-1/2 w-full -translate-y-1/2 border-indigo-950" />
      <div className="h-1/2 w-full pt-5">
        <Counter
          id="counter2"
          points={points2}
          animatedCount={(diff, sign) => animatedCount({ points: points2, setPoints: setPoints2, diff, sign })}
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

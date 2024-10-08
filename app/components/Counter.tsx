'use client';

import { Calculator, Check, Minus, Plus, X } from 'lucide-react';
import React from 'react';
import { Button, IconButton } from './Button';

export const Counter = ({
  id,
  points,
  animatedCount,
  awake,
  setAwake,
}: {
  id: string;
  points: number;
  animatedCount: (diff: number, sign: -1 | 1) => void;
  awake: boolean;
  setAwake: (awake: boolean) => void;
}) => {
  const [diff, setDiff] = React.useState(0);
  const [sign, setSign] = React.useState<1 | -1>(-1);
  const [custom, setCustom] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative h-full select-none bg-gradient-to-b from-slate-950 to-indigo-950 px-4 pb-4">
      {!awake && (
        <div
          className="absolute left-0 top-0 z-10 h-full w-full"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setAwake(true);
          }}
          onTouchStart={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          onTouchEnd={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setAwake(true);
          }}
          onKeyDown={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setAwake(true);
          }}
        />
      )}
      <div
        ref={ref}
        onClick={(event) => {
          if (ref.current === event.target) {
            setAwake(false);
          }
        }}
        className={`flex h-full flex-col items-center justify-center gap-2 ${awake ? '' : 'pointer-events-none touch-none'}`}
      >
        {!custom && (
          <div className={`flex-1 transition-opacity ${awake ? '' : 'pointer-events-none opacity-0'}`}>
            <div className="relative grid grid-cols-2 gap-2">
              <Button negative={sign === -1} onClick={() => setDiff((prev) => prev + 1000)}>
                {sign === 1 ? '+' : '-'}1000
              </Button>

              <Button negative={sign === -1} onClick={() => setDiff((prev) => prev + 200)}>
                {sign === 1 ? '+' : '-'}200
              </Button>

              <Button negative={sign === -1} onClick={() => setDiff((prev) => prev + 500)}>
                {sign === 1 ? '+' : '-'}500
              </Button>
              <Button negative={sign === -1} onClick={() => setDiff((prev) => prev + 100)}>
                {sign === 1 ? '+' : '-'}100
              </Button>
            </div>
          </div>
        )}
        <div className="grid shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-x-4 gap-y-2">
          <div
            onClick={() => {
              if (!custom) setAwake(false);
            }}
            className="col-start-2 text-end text-5xl font-bold"
          >
            <span>{isClient ? points : 8000}</span>
          </div>
          <div className={`transition-opacity ${(awake || custom) && diff > 0 ? '' : 'pointer-events-none opacity-0'}`}>
            <IconButton
              onClick={() => {
                setDiff(0);
              }}
            >
              <X size="20" />
            </IconButton>
          </div>
          <div
            className={`col-start-1 flex items-center justify-end transition-opacity ${awake || custom ? '' : 'pointer-events-none opacity-0'}`}
          >
            <IconButton negative={sign === -1} onClick={() => setSign((prev) => (prev === 1 ? -1 : 1))}>
              {sign === 1 ? <Plus /> : <Minus />}
            </IconButton>
          </div>
          <div
            className={`min text-end text-5xl transition-opacity ${awake || custom ? '' : 'pointer-events-none opacity-0'}`}
          >
            <span>{diff}</span>
          </div>

          <div
            className={`flex items-center transition-opacity ${awake || custom ? '' : 'pointer-events-none opacity-0'}`}
          >
            <IconButton
              onClick={() => {
                sessionStorage.setItem(id, Math.min(99999, Math.max(0, points + diff * sign)).toString());
                animatedCount(diff, sign);
                setDiff(0);
                setCustom(false);
                setAwake(false);
              }}
            >
              <Check />
            </IconButton>
          </div>
        </div>
        <div className="flex-1">
          {custom ? (
            <div className="flex h-full flex-col items-center justify-between gap-2">
              <div className="grid grid-cols-3 gap-1">
                <IconButton auto onClick={() => setDiff((prev) => Math.min(99999, parseInt(prev.toString() + '1')))}>
                  1
                </IconButton>
                <IconButton auto onClick={() => setDiff((prev) => Math.min(99999, parseInt(prev.toString() + '2')))}>
                  2
                </IconButton>
                <IconButton auto onClick={() => setDiff((prev) => Math.min(99999, parseInt(prev.toString() + '3')))}>
                  3
                </IconButton>
                <IconButton auto onClick={() => setDiff((prev) => Math.min(99999, parseInt(prev.toString() + '4')))}>
                  4
                </IconButton>
                <IconButton auto onClick={() => setDiff((prev) => Math.min(99999, parseInt(prev.toString() + '5')))}>
                  5
                </IconButton>
                <IconButton auto onClick={() => setDiff((prev) => Math.min(99999, parseInt(prev.toString() + '6')))}>
                  6
                </IconButton>
                <IconButton auto onClick={() => setDiff((prev) => Math.min(99999, parseInt(prev.toString() + '7')))}>
                  7
                </IconButton>
                <IconButton auto onClick={() => setDiff((prev) => Math.min(99999, parseInt(prev.toString() + '8')))}>
                  8
                </IconButton>
                <IconButton auto onClick={() => setDiff((prev) => Math.min(99999, parseInt(prev.toString() + '9')))}>
                  9
                </IconButton>
                <IconButton auto onClick={() => setDiff((prev) => Math.min(99999, parseInt(prev.toString() + '000')))}>
                  000
                </IconButton>
                <IconButton auto onClick={() => setDiff((prev) => Math.min(99999, parseInt(prev.toString() + '0')))}>
                  0
                </IconButton>

                <IconButton auto onClick={() => setDiff((prev) => Math.floor(prev / 10))}>
                  ←
                </IconButton>
              </div>
              <div className="flex items-center justify-center">
                <IconButton
                  large
                  onClick={() => {
                    setCustom(false);
                  }}
                >
                  <X />
                </IconButton>
              </div>
            </div>
          ) : (
            <div
              className={`flex h-full items-end justify-center transition-opacity ${awake ? '' : 'pointer-events-none opacity-0'}`}
            >
              <IconButton
                large
                onClick={() => {
                  setCustom(true);
                }}
              >
                <Calculator />
              </IconButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

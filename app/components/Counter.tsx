'use client';

import { Calculator, Equal, Minus, Plus, X } from 'lucide-react';
import React from 'react';

export const Counter = () => {
  const [points, setPoints] = React.useState(8000);
  const [diff, setDiff] = React.useState(0);
  const [sign, setSign] = React.useState<1 | -1>(1);
  const [custom, setCustom] = React.useState(false);
  const [awake, setAwake] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  const wake = () => {
    if (!awake) {
      setAwake(true);
      clearTimeout(timeoutRef.current);
      if (!custom) timeoutRef.current = setTimeout(() => setAwake(false), 7000);
    }
  };

  return (
    <div
      onMouseEnter={() => wake()}
      onClick={() => wake()}
      className="flex h-full flex-col items-center justify-center gap-4 bg-gradient-to-b from-slate-950 to-indigo-950 px-4 py-4"
    >
      {!custom && (
        <div className={`flex-1 transition-opacity ${awake ? '' : 'pointer-events-none opacity-0'}`}>
          <div className="flex flex-wrap items-start justify-center gap-2">
            <Button negative={sign === -1} onClick={() => setDiff((prev) => prev + 1000)}>
              {sign === 1 ? '+' : '-'}1000
            </Button>
            <Button negative={sign === -1} onClick={() => setDiff((prev) => prev + 500)}>
              {sign === 1 ? '+' : '-'}500
            </Button>
            <Button negative={sign === -1} onClick={() => setDiff((prev) => prev + 200)}>
              {sign === 1 ? '+' : '-'}200
            </Button>
            <Button negative={sign === -1} onClick={() => setDiff((prev) => prev + 100)}>
              {sign === 1 ? '+' : '-'}100
            </Button>
            <button
              disabled={diff === 0}
              className="inline-flex min-w-24 items-center justify-center gap-2 rounded-full border border-transparent bg-blue-950 px-3 py-2 text-xl leading-none text-white disabled:opacity-50"
              onClick={() => setDiff(0)}
            >
              <X size="20" />
              <span>Clear</span>
            </button>
          </div>
        </div>
      )}
      <div className="grid w-full shrink-0 grid-cols-[1fr_auto_1fr] gap-x-4 gap-y-2">
        <div className="col-start-2 text-end text-5xl font-bold" onClick={() => awake && setAwake(false)}>
          <span>{points}</span>
        </div>
        <div
          className={`col-start-1 flex items-center justify-end transition-opacity ${awake ? '' : 'pointer-events-none opacity-0'}`}
        >
          <IconButton negative={sign === -1} onClick={() => setSign((prev) => (prev === 1 ? -1 : 1))}>
            {sign === 1 ? <Plus /> : <Minus />}
          </IconButton>
        </div>
        <div className={`min text-end text-5xl transition-opacity ${awake ? '' : 'pointer-events-none opacity-0'}`}>
          <span>{diff}</span>
        </div>

        <div className={`flex items-center transition-opacity ${awake ? '' : 'pointer-events-none opacity-0'}`}>
          <IconButton
            onClick={() => {
              setPoints((prev) => Math.min(99999, Math.max(0, prev + diff * sign)));
              setDiff(0);
            }}
          >
            <Equal />
          </IconButton>
        </div>
      </div>
      <div className="flex-1">
        {custom ? (
          <div className="flex h-full flex-col items-center justify-center gap-2">
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
                  clearTimeout(timeoutRef.current);
                  timeoutRef.current = setTimeout(() => setAwake(false), 7000);
                }}
              >
                <X />
              </IconButton>
            </div>
          </div>
        ) : (
          <div
            className={`flex h-full items-center justify-center transition-opacity ${awake ? '' : 'pointer-events-none opacity-0'}`}
          >
            <IconButton
              large
              onClick={() => {
                setCustom(true);
                clearTimeout(timeoutRef.current);
              }}
            >
              <Calculator />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
};

const Button = ({
  children,
  negative,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { negative?: boolean }) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full border bg-indigo-950 text-xl leading-none text-white ${negative ? 'border-rose-900' : 'border-indigo-800'} min-w-24 px-3 py-2`}
      {...props}
    >
      <span>{children}</span>
    </button>
  );
};

const IconButton = ({
  children,
  negative,
  auto,
  large,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { negative?: boolean; large?: boolean; auto?: boolean }) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full border bg-indigo-950 text-xl leading-none text-white ${negative ? 'border-rose-900' : 'border-indigo-800'} ${auto ? 'min-h-10 min-w-10 px-3 py-2' : large ? 'h-12 w-12' : 'h-10 w-10'}`}
      {...props}
    >
      <span>{children}</span>
    </button>
  );
};

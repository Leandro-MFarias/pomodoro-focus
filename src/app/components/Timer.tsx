"use client";

import { orbitron } from "@/lib/fonts";
interface TimerProps {
  stage: number;
  counter: {
    pomodoro: number
    short: number
    long: number
  }
  switchStage: (index: number) => void;
  timeLeft: number;
  ticking: boolean;
  startTimer: () => void
}

type CounterKey = 'pomodoro' | 'short' | 'long';

export function Timer({
  stage,
  counter,
  switchStage,
  timeLeft,
  ticking,
  startTimer,
}: TimerProps) {
  const options: { label: string;  key: CounterKey}[] = [{label: "Pomodoro", key: 'pomodoro'}, {label: "Descanso", key: 'short'}, {label: "Longo Descanso", key: "long"}];

  function buttonsColorByIndex(index: number) {
    if (index === 0) return "text-red-600";
    if (index === 1) return "text-sky-600";
    return "text-lime-500";
  }

  function timerTextColor(stage: number): string {
    if (stage === 0) return "text-red-600";
    if (stage === 1) return "text-sky-600";
    return "text-green-500";
  }

  function shadowColor(stage: number) {
    if (stage === 0) return "shadow-red";
    if (stage === 1) return "shadow-blue";
    return "shadow-green";
  }

  function getBackgroundColor(index: number): string {
    if (index === 0) return "bg-red-900/30";
    if (index === 1) return "bg-sky-900/30";
    if (index === 2) return "bg-lime-900/30";
    return "";
  }

  
  function formatTime(ms: number) {
    const totalSeconds = Math.ceil(ms / 1000)
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0")
    const seconds = String(totalSeconds % 60).padStart(2, "0")
    return `${minutes}:${seconds}`
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 md:space-y-10">
      {/* NAVIGATION */}
      <ul className="flex space-x-1.5 xs:space-x-3 sm:space-x-6 px-1 sm:px-0 xl:pl-8">
        {options.map((option, index) => (
          <li
            key={index}
            className={`${
              stage === index && getBackgroundColor(index)
            } flex items-center px-1.5 py-1 ss:px-2 xs:px-3 ss:py-2 rounded-md ${buttonsColorByIndex(
              index
            )}`}
          >
            <button
              onClick={() => switchStage(index)}
              className={`cursor-pointer text-[9px] ss:text-xs xs:text-sm lg:text-base`}
            >
              {option.label} {counter[option.key]}
            </button>
          </li>
        ))}
      </ul>

      {/* Timer */}
      <div
        className={`flex flex-col items-center justify-around bg-zinc-900 w-[324px] h-[224px] ss:w-[420px] ss:h-[270px] xs:w-[520px] xs:h-[360px] rounded-md ${shadowColor(
          stage
        )}`}
      >
        <p
          className={`text-6xl xs:text-7xl font-bold mt-6 xs:mt-20 ${
            orbitron.className
          } 
          ${timerTextColor(stage)}`}
        >
          {formatTime(timeLeft)}
        </p>
        <span className={`${orbitron.className} tracking-widest`}>
          {stage === 0 ? "Time to focus!" : "Time for a break!" }
        </span>
        {/* BOTÃO COMEÇAR */}
        <div>
          <button
            onClick={startTimer}
            className={`relative bg-white xs:text-2xl font-bold px-8 xs:px-14 py-3 xs:py-4 rounded-md cursor-pointer transition-all duration-100
            ${ticking ? "translate-y-1" : ""} ${timerTextColor(stage)} ${
              orbitron.className
            }`}
          >
            {!ticking && (
              <span
                className="absolute inset-x-0 -bottom-0 h-1.5 xs:h-2 bg-gray-200 rounded-b-md"
                aria-hidden="true"
              />
            )}
            {ticking ? "Pausar" : "Começar"}
          </button>
        </div>
      </div>
    </div>
  );
}

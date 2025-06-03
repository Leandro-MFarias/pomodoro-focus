"use client";

import { orbitron } from "@/lib/fonts";

interface TimerProps {
  stage: number;
  switchStage: (index: number) => void;
  getTimes: () => number;
  seconds: number;
  ticking: boolean;
  setTicking: (ticking: boolean) => void;
}

export function Timer({
  stage,
  switchStage,
  getTimes,
  seconds,
  ticking,
  setTicking,
}: TimerProps) {
  const options = ["Pomodoro", "Descanso", "Longo Descanso"];

  function startTimer() {
    const audio = new Audio("/click-sound.mp3");
    audio.play();
    setTicking(!ticking);
  }

  function buttonsColorByIndex(index: number) {
    if (index === 0) return "bg-red-900/30 text-red-600";
    if (index === 1) return "bg-sky-900/30 text-sky-600";
    return "bg-lime-900/30 text-lime-500";
  }

  function timerTextColor(stage: number): string {
    if (stage === 0) return "text-red-600";
    if (stage === 1) return "text-sky-600";
    return "text-green-500";
  }

  function shadowColor(stage: number) {
    if (stage === 0) return "shadow-red"
    if (stage === 1) return "shadow-blue"
    return "shadow-green"
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-10">
      {/* NAVIGATION */}
      <ul className="flex gap-8 pl-12">
        {options.map((option, index) => (
          <li
            key={index}
            className={`px-3 py-1 rounded-md ${buttonsColorByIndex(index)}`}
          >
            <button
              onClick={() => switchStage(index)}
              className={`cursor-pointer`}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>

      {/* Timer */}
      <div
        className={`flex flex-col items-center justify-around bg-zinc-900 w-[520px] h-[360px] rounded-md ${shadowColor(stage)}`}
      >
        <p
          className={`text-7xl font-bold mt-20 ${orbitron.className} 
          ${timerTextColor(stage)}`}
        >
          {getTimes()}:{seconds.toString().padStart(2, "0")}
        </p>
        <span className={`${orbitron.className} tracking-widest`}>
          Time to Focus!
        </span>
        {/* BOTÃO COMEÇAR */}
        <div>
          <audio src="/click-sound.mp3" preload="auto" />
          <button
            onClick={startTimer}
            className={`relative bg-white text-2xl font-bold px-14 py-4 rounded-md cursor-pointer transition-all duration-100
            ${ticking ? "translate-y-1" : ""} ${timerTextColor(stage)} ${
              orbitron.className
            }`}
          >
            {!ticking && (
              <span
                className="absolute inset-x-0 -bottom-0 h-2 bg-gray-200 rounded-b-md"
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

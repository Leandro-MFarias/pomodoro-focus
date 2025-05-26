"use client";

import { orbitron } from "@/lib/fonts";
import { useState } from "react";

export function Timer() {
  const [clicked, setClicked] = useState(false);

  function playAudio() {
    const audio = new Audio("/click-sound.mp3");
    audio.play();
    setClicked(!clicked);
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-10">
      {/* NAVIGATION */}
      <ul className="flex gap-8">
        <li className={`bg-red-900/30 px-3 py-1 rounded-md`}>
          <button
            className={`text-red-600 cursor-pointer`}
          >
            Pomodoro 0
          </button>
        </li>
        <li className={`bg-sky-900/30 px-3 py-1 rounded-md`}>
          <button
            className="text-sky-500 cursor-pointer"
          >
            Descanso 0
          </button>
        </li>
        <li className={`bg-lime-900/30 px-3 py-1 rounded-md`}>
          <button
            className="text-lime-500 cursor-pointer"
          >
            Longo Descanso 0
          </button>
        </li>
      </ul>

      {/* Timer */}
      <div className="flex flex-col items-center justify-around bg-zinc-900 w-[520px] h-[360px] rounded-md shadow-shape">
        <p
          className={`text-7xl text-red-600 font-bold mt-20 ${orbitron.className}`}
        >
          25:00
        </p>
        <span className={`${orbitron.className} tracking-widest`}>
          Time to Focus!
        </span>
        {/* BOTÃO COMEÇAR */}
        <div>
          <audio src="/click-sound.mp3" preload="auto" />
          <button
            onClick={playAudio}
            className={`relative bg-white text-red-600 font-bold px-14 py-4 rounded-md cursor-pointer transition-all duration-100
            ${clicked ? "translate-y-1" : ""}`}
          >
            {!clicked && (
              <span
                className="absolute inset-x-0 -bottom-0 h-2 bg-gray-200 rounded-b-md"
                aria-hidden="true"
              />
            )}
            {clicked ? "Pausar" : "Começar"}
          </button>
        </div>
      </div>
    </div>
  );
}
 
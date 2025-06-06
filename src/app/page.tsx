"use client";

import { useEffect, useRef, useState } from "react";
import { Musics } from "./components/musics";
import { Timer } from "./components/Timer";
import { TodoList } from "./components/TodoList";
import { MusicProvider } from "./context/context";

export default function Home() {
  const [stage, setStage] = useState<number>(0);
  const [ticking, setTicking] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [counter, setCounter] = useState({
    pomodoro: 0,
    short: 0,
    long: 0,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const endTimeRef = useRef<number | null>(null);

  const durations = {
    0: 25 * 60,
    1: 5 * 60,
    2: 15 * 60,
  };

  // Define o tempo inicial sempre que mudar o stage
  useEffect(() => {
    setTimeLeft(durations[stage as 0 | 1 | 2] * 1000);
    setTicking(false);
    clearInterval(intervalRef.current!);
  }, [stage]);

  function startTimer() {
    if (ticking) {
      clearInterval(intervalRef.current!);
      setTicking(false);
      const remaining = (endTimeRef.current ?? 0) - Date.now();
      setTimeLeft(remaining);
    } else {
      const now = Date.now();
      const remaining =
        timeLeft > 0 ? timeLeft : durations[stage as 0 | 1 | 2] * 1000;
      endTimeRef.current = now + remaining;

      setTicking(true);
      intervalRef.current = setInterval(() => {
        const remaining = (endTimeRef.current ?? 0) - Date.now();

        if (remaining <= 0) {
          clearInterval(intervalRef.current!);
          if (stage === 0) {
            setCounter((prev) => ({ ...prev, pomodoro: prev.pomodoro + 1 }));
            setTimeLeft(durations[1] * 1000);
            setStage(1);
          } else if (stage === 1) {
            setCounter((prev) => ({ ...prev, short: prev.short + 1 }));
            setTimeLeft(durations[0] * 1000);
            setStage(0);
          } else {
            setCounter((prev) => ({ ...prev, long: prev.long + 1 }));
            setTimeLeft(durations[0] * 1000);
            setStage(0);
          }
          setTicking(false);
          playAlarm();
          return;
        }

        setTimeLeft(remaining);
      }, 100);
    }
    const audio = new Audio("/click-sound.mp3");
    audio.play();
  }

  function switchStage(i: number) {
    setStage(i);
  }

  function playAlarm() {
    const audio = new Audio("/game-alarm.mp3");
    audio.volume = 0.3;
    audio.play();
  }

  return (
    <div className="grid grid-rows-[60px_1fr_68px] h-screen">
      {/* HEADER */}
      <h1
        className={`text-center md:text-start text-3xl xs:text-4xl xl:text-5xl pt-8 sm:pt-4 py-4 md:py-8 md:pl-10 px-1.5 xs:px-0`}
      >
        Pomodoro Timer
      </h1>

      {/* MAIN CONTENT */}
      <main className="h-[88%] xs:h-full grid grid-rows-[1fr_144px] xs:grid-rows-[1fr_240px] sm:grid-rows-[1fr_280px] md:grid-rows-none md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_420px] xs:space-y-4 sm:space-y-0">
        <Timer
          counter={counter}
          stage={stage}
          switchStage={switchStage}
          timeLeft={timeLeft}
          startTimer={startTimer}
          ticking={ticking}
        />
        <TodoList />
      </main>

      {/* PLAYER MUSICS */}
      <footer className="fixed md:static bottom-0 w-full md:w-auto py-2 md:py-0 pl-2 md:pl-6 flex items-center bg-black/70 shadow-shape">
        <MusicProvider>
          <Musics />
        </MusicProvider>
      </footer>
    </div>
  );
}

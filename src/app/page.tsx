"use client";

import { useEffect, useState } from "react";
import { Musics } from "./components/musics";
import { Timer } from "./components/Timer";
import { TodoList } from "./components/TodoList";
import { MusicProvider } from "./context/context";

export default function Home() {
  // const [couter, setCouter] = useState()
  const [pomodoro, setPomodoro] = useState<number>(25);
  const [long, setLong] = useState<number>(15);
  const [short, setShort] = useState<number>(5);
  const [seconds, setSeconds] = useState<number>(0);
  const [ticking, setTicking] = useState(false);
  const [consumed, setConsumed] = useState<number>(0);
  const [stage, setStage] = useState<number>(0);

  function switchStage(i: number) {
    const isYes =
      consumed && stage !== i
        ? confirm("Tem certeza que quer trocar? ")
        : false;

    if (isYes) {
      reset();
      setStage(i);
    } else if (!consumed) {
      setStage(i);
    }

    setStage(i);
  }

  function getTimes() {
    const timeStage = {
      0: pomodoro,
      1: short,
      2: long,
    };

    return timeStage[stage as 0 | 1 | 2];
  }

  function updateMinute() {
    const updateStage = {
      0: setPomodoro,
      1: setShort,
      2: setLong,
    };

    return updateStage[stage as 0 | 1 | 2];
  }

  function reset() {
    setConsumed(0);
    setTicking(false);
    setSeconds(0);
    setPomodoro(25);
    setLong(15);
    setShort(5);
  }

  function clockTicking() {
    const minutes = getTimes();
    const setMinutes = updateMinute();

    if (minutes === 0 && seconds === 0) {
      playAlarm();
      reset();
    } else if (seconds === 0) {
      setMinutes((minute: number) => minute - 1);
      setSeconds(59);
    } else {
      setSeconds((second) => second - 1);
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (ticking) {
        setConsumed((value) => value + 1);
        clockTicking();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [seconds, pomodoro, short, long, ticking]);

  function playAlarm() {
    const audio = new Audio("/game-alarm.mp3");
    audio.volume = 0.4
    audio.play();
  }

  return (
    <div className="grid grid-rows-[60px_1fr_68px] h-screen">
      {/* HEADER */}
      <h1 className={`text-center md:text-start text-3xl xs:text-4xl xl:text-5xl py-4 md:py-8 md:pl-10 px-1.5 xs:px-0`}>Pomodoro Timer</h1>

      {/* MAIN CONTENT */}
      <main className="h-[88%] xs:h-full grid grid-rows-[1fr_144px] xs:grid-rows-[1fr_240px] sm:grid-rows-[1fr_280px] md:grid-rows-none md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_420px] xs:space-y-4 sm:space-y-0">
        <Timer
          stage={stage}
          switchStage={switchStage}
          getTimes={getTimes}
          seconds={seconds}
          ticking={ticking}
          setTicking={setTicking}
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
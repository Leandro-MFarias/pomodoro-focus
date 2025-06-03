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
    const audio = new Audio("/public_alarm.mp3");
    audio.play();
  }

  return (
    <div className="flex flex-col justify-around">
      <div className="space-y-4 px-6 pr-2 mt-3">
        <h1 className={`text-5xl translate-6 `}>Pomodoro Timer</h1>

        <div className="grid grid-cols-[1fr_420px] h-[86vh]">
          {/* PRINCIPAL CONTAINER */}
          <Timer
            stage={stage}
            switchStage={switchStage}
            getTimes={getTimes}
            seconds={seconds}
            ticking={ticking}
            setTicking={setTicking}
          />

          {/* TODO LIST */}
          <TodoList />
        </div>
      </div>

      {/* PLAYER MUSICS */}
      <footer className="pl-6 flex py-4 items-center bg-black/70 shadow-t-shape">
        <MusicProvider>
          <Musics />
        </MusicProvider>
      </footer>

      {/* ALARM */}
      <audio src="/public_alarm.mp3" preload="auto" />
    </div>
  );
}

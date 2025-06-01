"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { clair } from "../_list-musics";

const MusicContext = createContext(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = clair[currentTrackIndex].url;
  const nameTrack = clair[currentTrackIndex].title

  useEffect(() => {
    audioRef.current = new Audio(currentTrack);

    if (isPlaying) audioRef.current.play();

    return () => {
      audioRef.current?.pause();
    };
  }, [currentTrack]);

  function playAudio() {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else if (audioRef.current.played) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }

  function nextMusic() {
    setCurrentTrackIndex((prev) => (prev + 1) % clair.length);
  }

  function prevMusic() {
    setCurrentTrackIndex((prev) => (prev === 0 ? clair.length - 1 : prev - 1));
  }

  return (
    <MusicContext.Provider
      value={{ isPlaying, setIsPlaying, playAudio, nextMusic, prevMusic, nameTrack }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("Musica de ser usada dentro de um musicProvider.");
  }

  return context;
}

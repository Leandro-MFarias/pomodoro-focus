"use client";

import {
  ChangeEvent,
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { clair } from "../list-musics";

interface MusicContextType {
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  playAudio: () => void;
  nextMusic: () => void;
  prevMusic: () => void;
  currentTrack: {
    id: number;
    title: string;
    url: string;
  };
  volume: number;
  handleInputVolume: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMuteButton: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0); // Index da Musica a tocar
  const [volume, setVolume] = useState(0.4);
  const [isPlaying, setIsPlaying] = useState(false); // Verifica se está tocando ou não
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = clair[currentTrackIndex]; // Recebe a msc conformo o index

  useEffect(() => {
    const audio = (audioRef.current = new Audio(currentTrack.url));
    audio.volume = volume;
    if (isPlaying) audio.play();

    function handleEnded() {
      setCurrentTrackIndex((prev) => (prev + 1) % clair.length);
    }

    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.pause();
      audio.removeEventListener("ended", handleEnded)
    };
  }, [currentTrackIndex]);

  function playAudio() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else if (audio.played) {
      audio.pause();
      setIsPlaying(false);
    }
  }

  function nextMusic() {
    setCurrentTrackIndex((prev) => (prev + 1) % clair.length);
  }

  function prevMusic() {
    setCurrentTrackIndex((prev) => (prev === 0 ? clair.length - 1 : prev - 1));
  }

  function handleInputVolume(e: ChangeEvent<HTMLInputElement>) {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  }

  function handleMuteButton() {
    let newVolume = 0;
    if (volume === 0) {
      newVolume = 0.4;
      setVolume(newVolume);
    } else {
      setVolume(newVolume);
    }

    if (audioRef.current) audioRef.current.volume = newVolume;
  }

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        playAudio,
        nextMusic,
        prevMusic,
        currentTrack,
        volume,
        handleInputVolume,
        handleMuteButton,
      }}
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

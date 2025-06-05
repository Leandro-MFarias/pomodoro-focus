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
import { clair, Track } from "../list-musics";

interface MusicContextType {
  albumName: string
  isPlaying: boolean;
  volume: number;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  playAudio: () => void;
  nextMusic: () => void;
  prevMusic: () => void;
  handleInputVolume: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMuteButton: () => void;
  albumToPlay: (albumSelected: Track[], name: string) => void;
  currentMusic: {
    id: number;
    title: string;
    url: string;
  };
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0); // Index da Musica a tocar
  const [album, setAlbum] = useState<Track[]>(clair); // Qual album vai ser tocado
  const [volume, setVolume] = useState(0.1); // Armazena um volume padrão
  const [isPlaying, setIsPlaying] = useState(false); // Verifica se está tocando ou não
  const [currentMusic, setCurrentMusic] = useState(clair[0]) // Salva a musica atual para mostra o nome
  const [albumName, setAlbumName] = useState("Clair Obscure") // Nome do album tocado
  
  const audioRef = useRef<HTMLAudioElement | null>(null); // Cria uma referencia para o audio

  function albumToPlay(albumSelected: Track[], name: string) {
    setAlbum(albumSelected)
    setCurrentTrackIndex(0)
    setAlbumName(name)
    setIsPlaying(true)
  }

  useEffect(() => {
    const track = album[currentTrackIndex];
    if (!track) return;

    const audio = (audioRef.current = new Audio(track.url));
    audio.volume = volume;

    setCurrentMusic(track)
    if (isPlaying) audio.play()

    function handleEnded() {
      setCurrentTrackIndex((prev) => (prev + 1) % album.length);
    }

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrackIndex, album]);

  // FUNCTION DE START E PAUSE 
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
    setCurrentTrackIndex((prev) => (prev + 1) % album.length);
  }

  function prevMusic() {
    setCurrentTrackIndex((prev) => (prev === 0 ? album.length - 1 : prev - 1));
  }

  function handleInputVolume(e: ChangeEvent<HTMLInputElement>) {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  }

  function handleMuteButton() {
    let newVolume = 0;
    if (volume === 0) {
      newVolume = 0.3;
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
        volume,
        handleInputVolume,
        handleMuteButton,
        albumToPlay,
        currentMusic,
        albumName
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

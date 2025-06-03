"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { orbitron } from "@/lib/fonts";
import {
  MenuIcon,
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
  Volume2Icon,
  VolumeXIcon,
} from "lucide-react";
import { useState } from "react";
import { Albums } from "./albums";
import { useMusic } from "../context/context";
import { clair, doom, zelda } from "../list-musics";

export function Musics() {
  const {
    isPlaying,
    playAudio,
    nextMusic,
    prevMusic,
    currentMusic,
    volume,
    handleInputVolume,
    handleMuteButton,
  } = useMusic();

  const [isOpen, setIsOpen] = useState(false); // MODAL

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {/* PLAYER */}
      <div className="flex items-center space-x-2 md:space-x-10">
        <button className="cursor-pointer" onClick={() => setIsOpen(true)}>
          <MenuIcon size={40} />
        </button>
        <div className="flex items-center space-x-6">
          <button onClick={playAudio} className="cursor-pointer">
            {isPlaying ? (
              <PauseIcon className="w-7 h-7 md:w-9 md:h-9" />
            ) : (
              <PlayIcon className="w-7 h-7 md:w-9 md:h-9" />
            )}
          </button>

          <button onClick={prevMusic} className="cursor-pointer">
            <SkipBackIcon className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button onClick={nextMusic} className="cursor-pointer">
            <SkipForwardIcon className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div className="flex items-center w-full space-x-2">
            <button onClick={handleMuteButton}>
              {volume === 0 ? (
                <VolumeXIcon className="w-5 h-5 md:w-6 md:h-6" />
              ) : (
                <Volume2Icon className="w-5 h-5 md:w-6 md:h-6" />
              )}
            </button>

            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleInputVolume}
              className="w-24 sm:w-28"
            />

            {currentMusic && (
              <p
                className={`md:tracking-tighter text-white/70 sm:text-xs md:text-sm lg:text-base hidden sm:block`}
              >
                {currentMusic.title} - Faixa {currentMusic.id}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ALBUMS */}
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Mixes</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className={`flex gap-x-4 pl-8 px-4 ${orbitron.className}`}>
          {/* CLAIR  */}
          <Albums
            img="/clair.png"
            alt="Clair Obscure Album"
            name="Clair Obscure"
            tracks="8 tracks"
            album={clair}
          />

          {/* DOOM */}
          <Albums
            img="/doom.jpg"
            alt="Doom Album"
            name="Doom Slayer"
            tracks="7 tracks"
            album={doom}
          />

          {/* ZELDA */}
          <Albums
            img="/zelda.png"
            alt="Zelda Album"
            name="Zelda Ocarina"
            tracks="7 tracks"
            album={zelda}
          />
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

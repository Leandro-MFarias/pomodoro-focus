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

export function Musics() {
  const { isPlaying, playAudio, nextMusic, prevMusic, currentTrack, volume, handleInputVolume, handleMuteButton } =
    useMusic(); // Context

  const [isOpen, setIsOpen] = useState(false); // MODAL

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {/* PLAYER */}
      <div className="flex items-center space-x-10 -translate-y-1.5 w-full">
        <button className="cursor-pointer" onClick={() => setIsOpen(true)}>
          <MenuIcon size={40} />
        </button>
        <div className="flex items-center space-x-6 w-[70%]">
          <button onClick={playAudio} className="cursor-pointer">
            {isPlaying ? <PauseIcon size={35} /> : <PlayIcon size={35} />}
          </button>

          <button onClick={prevMusic} className="cursor-pointer">
            <SkipBackIcon />
          </button>

          <button onClick={nextMusic} className="cursor-pointer">
            <SkipForwardIcon />
          </button>

          <div className="flex items-center w-full space-x-2">
            <button onClick={handleMuteButton}>
              {volume === 0 ? <VolumeXIcon /> : <Volume2Icon /> }
            </button>

            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleInputVolume}
              className="w-28"
            />

            <p className={`tracking-tighter text-white/70`}>
              {currentTrack.title} - Faixa {currentTrack.id}
            </p>
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
          {/* DOOM */}
          <Albums
            img="/doom.jpg"
            alt="Doom Album"
            name="Doom Slayer"
            tracks="6 tracks"
          />

          {/* CLAIR  */}
          <Albums
            img="/clair.png"
            alt="Clair Obscure Album"
            name="Clair Obscure"
            tracks="5 tracks"
          />
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

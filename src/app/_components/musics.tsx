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
} from "lucide-react";
import { useState } from "react";
import { Albums } from "./albums";
import { useMusic } from "../_context/context";

export function Musics() {
  const { isPlaying, playAudio, nextMusic, prevMusic, nameTrack } = useMusic(); // Context

  const [isOpen, setIsOpen] = useState(false); // MODAL

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {/* PLAYER */}
      <div className="flex space-x-10">
        <button className="cursor-pointer" onClick={() => setIsOpen(true)}>
          <MenuIcon size={30} />
        </button>
        <div className="flex items-center space-x-6">
          <button onClick={playAudio}>
            {isPlaying ? <PauseIcon size={35} /> : <PlayIcon size={35} />}
          </button>

          <button onClick={prevMusic}>
            <SkipBackIcon />
          </button>

          <button onClick={nextMusic}>
            <SkipForwardIcon />
          </button>

          <p>{nameTrack}</p>
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

"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { orbitron } from "@/lib/fonts";
import { MenuIcon, PauseCircleIcon, PlayCircleIcon } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export function Musics() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  function playAudio() {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button>
          <MenuIcon size={30} />
        </button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Mixes</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className={`flex gap-x-4 px-4 ${orbitron.className}`}>
          {/*  */}
          <div className="h-64 w-48 flex flex-col items-center justify-center bg-white/80 text-black space-y-2 rounded-lg">
            <div className="relative">
              <Image
                src="/doom.jpg"
                width={160}
                height={160}
                alt="Imagem Doom"
              />
              <audio
                ref={audioRef}
                src="/02-only-thing-fear.mp3"
                preload="auto"
              />
              <button
                onClick={playAudio}
                className="items-center justify-center absolute top-0 bg-black/40 w-full h-full flex opacity-0 hover:opacity-100 transition duration-150"
              >
                {isPlaying ? (
                  <PauseCircleIcon
                    size={80}
                    className="text-white font-light cursor-pointer"
                  />
                ) : (
                  <PlayCircleIcon
                    size={80}
                    className="text-white font-light cursor-pointer"
                  />
                )}
              </button>
            </div>
            <div className="pl-4 self-start font-semibold">
              <h4>Doom Slayer</h4>
              <span>6 tracks</span>
            </div>
          </div>
          {/*  */}
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

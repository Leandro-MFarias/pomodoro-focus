import { PauseCircleIcon, PlayCircleIcon } from "lucide-react";
import Image from "next/image";
import { useMusic } from "../context/context";
import { Track } from "../list-musics";
import { orbitron } from "@/lib/fonts";
interface AlbumsProps {
  img: string;
  alt: string;
  name: string;
  tracks: string;
  album: Track[];
}

export function Albums({ img, alt, name, tracks, album }: AlbumsProps) {
  const { isPlaying, albumToPlay, albumName } = useMusic();
  const { playAudio } = useMusic();

  function startAlbum(album: Track[], name: string) {
    if (albumName === name) {
      playAudio();
    } else {
      albumToPlay(album, name);
    }
  }

  return (
    <div className="h-64 w-[198px] flex flex-col items-center justify-center bg-white/80 text-black space-y-2 rounded-lg">
      <div className="relative">
        <Image
          src={img}
          width={160}
          height={160}
          alt={alt}
          className="rounded-md"
        />
        <button
          onClick={() => startAlbum(album, name)}
          className={`items-center justify-center absolute top-0 bg-black/60 w-full h-full flex opacity-0 hover:opacity-100 transition duration-150 rounded-lg ${
            albumName === name && "opacity-100"
          }`}
        >
          {(albumName === name && isPlaying ) ? (
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
      <div
        className={`px-2 text-center w-full space-y-2.5 ${orbitron.className}`}
      >
        <h4 className="text-xl">{name}</h4>
        <button className="bg-blue-500 w-40 py-1 rounded-[3px] text-white cursor-pointer">
          {tracks}
        </button>
      </div>
    </div>
  );
}

import { PauseCircleIcon, PlayCircleIcon } from "lucide-react";
import Image from "next/image";
import { useMusic } from "../context/context";
import { Track } from "../list-musics";
interface AlbumsProps {
  img: string
  alt: string
  name: string
  tracks: string
  album: Track[]
}

export function Albums({ img, alt, name, tracks, album }: AlbumsProps) {
  const { albumToPlay } = useMusic()
  const { isPlaying, playAudio } = useMusic()

  function startAlbum(album: Track[]) {
    albumToPlay(album)
    playAudio()
  }

  return (
    <div className="h-64 w-48 flex flex-col items-center justify-center bg-white/80 text-black space-y-2 rounded-lg">
      <div className="relative">
        <Image
          src={img}
          width={160}
          height={160}
          alt={alt}
        />
        <button
          onClick={() => startAlbum(album)}
          className="items-center justify-center absolute top-0 bg-black/60 w-full h-full flex opacity-0 hover:opacity-100 transition duration-150"
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
        <h4>{name}</h4>
        <span>{tracks}</span>
      </div>
    </div>
  );
}

import { Musics } from "./_components/musics";
import { Timer } from "./_components/Timer";
import { TodoList } from "./_components/TodoList";

export default function Home() {
  return (
    <div className="flex flex-col justify-around">
      <div className="space-y-4 px-6 pr-2 mt-3">
        <h1 className={`text-5xl translate-y-4`}>Pomodoro Timer</h1>

        <div className="grid grid-cols-[1fr_420px] h-[86vh]">
          {/* PRINCIPAL CONTAINER */}
          <Timer />

          {/* TODO LIST */}
          <TodoList />
        </div>
      </div>

      {/* PLAYER MUSICS */}
      <footer className="pl-4 flex py-4 items-center bg-black/70 shadow-t-shape">
        <Musics />
      </footer>
    </div>
  );
}

import { Timer } from "./_components/Timer";
import { TodoList } from "./_components/TodoList";

export default function Home() {
  return (
    <div className="space-y-4 p-6 pr-2">
      <h1 className={`text-5xl`}>Pomodoro Timer</h1>

      <div className="grid grid-cols-[1fr_420px] h-[86vh]">
        {/* PRINCIPAL CONTAINER */}
        <Timer />

        {/* TODO LIST */}
        <TodoList />
      </div>

      {/* PLAYER MUSICS */}
      <footer></footer>
    </div>
  );
}

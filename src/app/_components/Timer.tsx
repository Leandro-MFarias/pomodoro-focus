import { orbitron } from "@/lib/fonts";

export function Timer() {
  return (
    <div className="flex flex-col items-center justify-center space-y-10">
      {/* NAVIGATION */}
      <ul className="flex gap-8">
        <li className={`bg-red-900/30 px-3 py-1 rounded-md`}>
          <button className={`text-red-600 cursor-pointer`}>Pomodoro 0</button>
        </li>
        <li className={`bg-sky-900/30 px-3 py-1 rounded-md`}>
          <button className="text-sky-500 cursor-pointer">Descanso 0</button>
        </li>
        <li className={`bg-lime-900/30 px-3 py-1 rounded-md`}>
          <button className="text-lime-500 cursor-pointer">Longo Descanso 0</button>
        </li>
      </ul>

      {/* Timer */}
      <div className="flex flex-col items-center justify-around bg-zinc-900 w-[520px] h-[360px] rounded-md shadow-shape">
        <p
          className={`text-7xl text-red-600 font-bold mt-20 ${orbitron.className}`}
        >
          25:00
        </p>
        <span className={`${orbitron.className} tracking-widest`}>Time to Focus!</span>
        {/* BOTÃO COMEÇAR */}
        <button className="relative bg-white text-red-600 font-bold px-14 py-4 rounded-md cursor-pointer after:content-[''] after:absolute after:inset-x-0 after:-bottom-1 after:h-2 after:bg-gray-200 after:rounded-b-md active:translate-y-1 active:after:opacity-0 transition-all duration-100">
          Começar
        </button>
      </div>
    </div>
  );
}
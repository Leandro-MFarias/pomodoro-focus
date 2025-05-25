import { CheckIcon, EllipsisVerticalIcon } from "lucide-react";
import { orbitron } from "./layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  return (
    <div className="space-y-4 p-6 pr-2">
      <h1 className={`text-5xl`}>Pomodoro Timer</h1>

      <div className="grid grid-cols-[1fr_420px] h-[86vh]">
        {/* PRINCIPAL CONTAINER */}
        <div className="flex flex-col items-center justify-center space-y-10">
          {/* NAVIGATION */}
          <ul className="flex gap-8">
            <li className="text-red-600">
              <button>Pomodoro 0</button>
            </li>
            <li className="text-sky-500">
              <button>Descanso 0</button>
            </li>
            <li className="text-lime-500">
              <button>Longo Descanso 0</button>
            </li>
          </ul>

          {/* Timer */}
          <div className="flex flex-col items-center justify-around bg-zinc-800 w-[520px] h-[360px] rounded-md">
            <span
              className={`text-7xl text-violet-500 font-bold mt-20 ${orbitron.className}`}
            >
              25:00
            </span>
            {/* BOTÃO COMEÇAR */}
            <button className="relative bg-white text-violet-500 font-bold px-14 py-4 rounded-md cursor-pointer after:content-[''] after:absolute after:inset-x-0 after:-bottom-1 after:h-2 after:bg-gray-200 after:rounded-b-md active:translate-y-1 active:after:opacity-0 transition-all duration-100">
              Começar
            </button>
          </div>
        </div>

        {/* TODO LIST */}
        <div className="border-white border-l-1 px-2 space-y-6">
          <h3 className="text-2xl border-white border-b-1 pb-2">Tarefas 0</h3>
          <div className="px-1">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem
                value="item-1"
                className={`w-full px-3 text-muted-foreground bg-zinc-900 rounded-sm ${orbitron.className}`}
              >
                <div className="flex w-full">
                  {/* Ícone fora do trigger */}
                  <button className="cursor-pointer hover:text-white text-lime-400 mr-2">
                    <CheckIcon />
                  </button>

                  {/* Wrapper para forçar o trigger a ocupar todo o restante */}
                  <div className="flex-1 items-center">
                    <AccordionTrigger className="flex items-center w-full hover:text-white cursor-pointer">
                      <p className=" line-clamp-1">Lorem ipsum dolor sit amet</p>
                    </AccordionTrigger>
                  </div>
                </div>

                <AccordionContent className="">
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <li className="flex items-center px-3 py-2 gap-2 text-muted-foreground bg-zinc-900 rounded-sm mt-5">
              <button
                className={`cursor-pointer hover:text-white text-lime-400`}
              >
                <CheckIcon />
              </button>
              <p className={`text-xs line-clamp-1 line-through`}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                impedit, esse illum iusto dolore repellendus magni facere
                similique distinctio aspernatur aliquid sapiente eius
                dignissimos tempore quasi voluptatibus cum quas incidunt.
              </p>
              <button className="cursor-pointer hover:text-white">
                <EllipsisVerticalIcon />
              </button>
            </li>
          </div>
        </div>
      </div>

      {/* PLAYER MUSICS */}
      <footer></footer>
    </div>
  );
}

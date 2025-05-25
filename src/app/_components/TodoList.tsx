
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { orbitron } from "../layout";
import { CheckIcon, EllipsisVerticalIcon } from "lucide-react";

export function TodoList() {
  return (
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
          <button className={`cursor-pointer hover:text-white text-lime-400`}>
            <CheckIcon />
          </button>
          <p className={`text-xs line-clamp-1 line-through`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et impedit,
            esse illum iusto dolore repellendus magni facere similique
            distinctio aspernatur aliquid sapiente eius dignissimos tempore
            quasi voluptatibus cum quas incidunt.
          </p>
          <button className="cursor-pointer hover:text-white">
            <EllipsisVerticalIcon />
          </button>
        </li>
      </div>
    </div>
  );
}

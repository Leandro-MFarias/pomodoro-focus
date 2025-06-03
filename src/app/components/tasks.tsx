import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { orbitron } from "@/lib/fonts";
import { CheckIcon, Trash2Icon } from "lucide-react";
import { DataProps } from "./types";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TasksProps {
  removeTask: (id: number) => void;
  tasks: DataProps[];
  setTasks: React.Dispatch<React.SetStateAction<DataProps[]>>;
}

export function Tasks({ tasks, removeTask, setTasks }: TasksProps) {
  function handleTaskCompleted(taskId: number) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });

    setTasks(newTasks);
  }

  return (
    <ScrollArea className="h-[100px] xs:h-[140px] sm:h-[220px] md:h-full">
      <Accordion type="single" collapsible className="w-full space-y-4">
        {tasks.map((task) => (
          <AccordionItem
            key={task.id}
            value={`item-${task.id}`}
            className={`w-full px-3 text-muted-foreground bg-zinc-900 rounded-sm shadow-shape ${orbitron.className}`}
          >
            <div className="flex w-full">
              <button
                onClick={() => handleTaskCompleted(task.id)}
                className={`cursor-pointer mr-2 ${
                  task.isCompleted && "text-lime-400"
                }`}
              >
                <CheckIcon />
              </button>
              <div className="flex-1 items-center">
                <AccordionTrigger className="flex items-center w-full text-white cursor-pointer">
                  <p
                    className={`line-clamp-1 ${
                      task.isCompleted && "line-through text-muted-foreground"
                    }`}
                  >
                    {task.title}
                  </p>
                </AccordionTrigger>
              </div>
            </div>

            <AccordionContent className="pr-0.5">
              <div className="flex items-center justify-between">
                <p
                  className={`max-w-80 text-justify ${orbitron.className} font-bold text-neutral-400`}
                >
                  {task.description}
                </p>
                <Trash2Icon
                  size={20}
                  className="hover:text-red-600 cursor-pointer"
                  onClick={() => removeTask(task.id)}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ScrollArea>
  );
}

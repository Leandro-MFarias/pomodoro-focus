"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { orbitron } from "@/lib/fonts";
import { CheckIcon, RotateCcwIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { CreateTaskData, DataProps } from "./types";
import { FormTask } from "./form";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function TodoList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<DataProps[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addNewTask(data: CreateTaskData) {
    const newTask = {
      id: tasks.length + 1,
      title: data.title,
      description: data.description,
    };
    setTasks([...tasks, newTask]);
  }

  function removeTask(taskId: number) {
    const newList = tasks.filter((task) => task.id !== taskId);
    setTasks(newList);
  }
  
  function removeAllTasks() {
    const newList = tasks.filter(task => task !== task)
    setTasks(newList)
  }

  return (
    <>
      <div className="border-white border-l-1 px-2 space-y-6">
        {/* HEADER */}
        <div className="flex justify-between border-white border-b-1 pb-2">
          <h3 className="text-2xl">Tarefas {tasks.length}</h3>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer">
                <RotateCcwIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-1">
                <DropdownMenuItem
                  className={`${orbitron.className} cursor-pointer`}
                  onClick={removeAllTasks}
                >
                  Limpar Tasks
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <button
              onClick={() => setIsModalOpen(true)}
              className={`${orbitron.className} bg-white text-black px-2 py-1 text-sm rounded-xs cursor-pointer hover:bg-white/40 transition duration-100 ease-in`}
            >
              Nova Tarefa
            </button>
          </div>
        </div>

        {/* TASKS */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          {tasks.map((task) => (
            <AccordionItem
              key={task.id}
              value={`item-${task.id}`}
              className={`w-full px-3 text-muted-foreground bg-zinc-900 rounded-sm ${orbitron.className}`}
            >
              <div className="flex w-full">
                <button className="cursor-pointer hover:text-white text-lime-400 mr-2">
                  <CheckIcon />
                </button>
                <div className="flex-1 items-center">
                  <AccordionTrigger className="flex items-center w-full text-white cursor-pointer">
                    <p className=" line-clamp-1">{task.title}</p>
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
      </div>

      {isModalOpen && (
        <div
          className={`fixed inset-0 bg-black/60 flex items-center justify-center ${orbitron.className}`}
        >
          <FormTask addNewTask={addNewTask} setIsModalOpen={setIsModalOpen} />
        </div>
      )}
    </>
  );
}

"use client";

import { orbitron } from "@/lib/fonts";
import { RotateCcwIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { CreateTaskData, DataProps } from "./types";
import { v4 as uuidv4 } from 'uuid';
import { FormTask } from "./form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tasks } from "./tasks";

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
      id: uuidv4(),
      title: data.title,
      description: data.description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  function removeTask(taskId: string) {
    const newList = tasks.filter((task) => task.id !== taskId);
    setTasks(newList);
  }

  function removeAllTasks() {
    const newList = tasks.filter((task) => task !== task);
    setTasks(newList);
  }

  const noCompleted = tasks.filter((task) => !task.isCompleted);

  return (
    <>
      <div className="md:border-zinc-500 md:border-l-1 px-2 space-y-6 max-w-[90%] ss:max-w-[460px] sm:max-w-2xl mx-auto w-full mt-2">
        {/* HEADER */}
        <div className="flex justify-between border-white border-b-1 pb-2">
          <h3 className="lg:text-2xl">Tarefas {noCompleted.length}</h3>
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
        <Tasks tasks={tasks} removeTask={removeTask} setTasks={setTasks} />
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

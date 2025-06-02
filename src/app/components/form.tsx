import { ChangeEvent, FormEvent, useState } from "react";
import { CreateTaskData } from "./types";
import { PlusIcon, X } from "lucide-react";

interface FormTaskProps {
  addNewTask: (data: CreateTaskData) => void;
  setIsModalOpen: (open: boolean) => void;
}

export function FormTask({ addNewTask, setIsModalOpen }: FormTaskProps) {
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setData((prev) => {
      const newList = { ...prev, [name]: value };
      return newList;
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (data.title.trim() === "") return

    addNewTask(data);

    setData({
      title: "",
      description: "",
    });
    setIsModalOpen(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-around space-y-4 px-4 py-2 bg-zinc-900 shadow-shape w-[420px] h-72 rounded-md"
    >
      <div className="flex justify-between">
        <h3 className="font-semibold">Nova Tarefa</h3>
        <button className="text-muted-foreground hover:text-white cursor-pointer">
          <X onClick={() => setIsModalOpen(false)} />
        </button>
      </div>
      <div className="flex flex-col space-y-8">
        <input
          name="title"
          value={data.title}
          type="text"
          placeholder="Nome da Tarefa"
          className="bg-zinc-800 rounded-md px-4 py-2"
          onChange={handleChange}
        />
        <input
          name="description"
          value={data.description}
          type="text"
          placeholder="Descrição da Tarefa"
          className="bg-zinc-800 rounded-md px-4 py-2"
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="flex bg-white text-black justify-center gap-4 py-2 rounded-md cursor-pointer hover:bg-white/70 transition duration-150 ease-in-out"
      >
        <p className="font-bold">Adicionar tarefa</p>
        <PlusIcon />
      </button>
    </form>
  );
}

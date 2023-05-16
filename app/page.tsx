"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { atom, useSetAtom, useAtom } from "jotai";
import type { PrimitiveAtom } from "jotai";

type Todo = {
  title: string;
};

const todosAtom = atom<PrimitiveAtom<Todo>[]>([]);

export default function Home() {
  const setTodos = useSetAtom(todosAtom);
  const [todos] = useAtom(todosAtom);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;

    if (!title) return alert("Title is required");

    setTodos((prev) => [...prev, atom<Todo>({ title })]);

    e.currentTarget.reset();
  };

  return (
    <main className="container mx-auto py-6">
      <form onSubmit={handleSubmit}>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="text" placeholder="Title" name="title" />
          <Button type="submit">Add</Button>
        </div>
        {JSON.stringify(todos)}
      </form>
    </main>
  );
}

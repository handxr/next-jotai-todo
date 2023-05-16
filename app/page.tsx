"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { atom, useSetAtom, useAtom } from "jotai";
import type { PrimitiveAtom } from "jotai";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type Todo = {
  title: string;
};
type RemoveFn = (todo: PrimitiveAtom<Todo>) => void;

const todosAtom = atom<PrimitiveAtom<Todo>[]>([]);

function TodoItem({
  todoAtom,
  remove,
}: {
  todoAtom: PrimitiveAtom<Todo>;
  remove: RemoveFn;
}) {
  const [todo] = useAtom(todoAtom);
  return (
    <div
      className="
      flex
      w-full
      max-w-sm
      items-center
      space-x-2
      mt-4
      border
      border-gray-200
      rounded-md
      p-2
      justify-between
    "
    >
      <span className="text-gray-700">{todo.title}</span>
      <Button
        type="button"
        variant="destructive"
        onClick={() => remove(todoAtom)}
      >
        Remove
      </Button>
    </div>
  );
}

export default function Home() {
  const setTodos = useSetAtom(todosAtom);
  const [todos] = useAtom(todosAtom);
  const [parent] = useAutoAnimate();

  const remove: RemoveFn = (todo) => {
    setTodos((prev) => prev.filter((t) => t !== todo));
  };

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
      </form>
      <ul ref={parent}>
        {todos.map((todo) => (
          <TodoItem key={todo.toString()} todoAtom={todo} remove={remove} />
        ))}
      </ul>
    </main>
  );
}

import Card from "components/ui/card";
import { useEffect, useState } from "react";
import type { TTodo } from "types/todo";
import env from "env.json";
import AddForm from "components/template/add-form";

export default function Add() {
  const todoInit: TTodo = {
    id: 1,
    title: "Buy milk",
    is_complete: false,
    created_at: "2021-10-10T10:00:00Z",
  };
  const [todos, setTodos] = useState<TTodo[]>([]);
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(env.BACKEND_URL + "/api");
      const data = await response.json();
      setTodos(data);
    };
    fetchTodos();
  });
  return (
    <div className="w-full container mx-8 md:mx-auto">
      <div className="space-y-4 block mb-8">
        <h1 className="text-5xl text-center my-8">Task Management</h1>
        <div className="flex justify-center content-center mx-auto max-w-[50vw] flex-wrap">
          <AddForm />
        </div>
      </div>
      <div className="space-y-4 flex justify-center flex-wrap">
        {todos.map((todo) => (
          <Card todo={todo} />
        ))}
      </div>
    </div>
  );
}

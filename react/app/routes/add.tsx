import Card from "components/ui/card";
import { useEffect, useState } from "react";
import type { TTodo } from "types/todo";
import env from "env.json";
import AddForm from "components/organism/add-form";

export default function Add() {
  const [completedTodos, setCompletedTodos] = useState<TTodo[]>([]);
  const [incompleteTodos, setIncompleteTodos] = useState<TTodo[]>([]);
  const fetchTodos = async (isComplete: number) => {
    const response = await fetch(
      env.BACKEND_URL + "/api/?is_complete=" + isComplete
    );
    const data = await response.json();
    isComplete <= 0 ? setIncompleteTodos(data) : setCompletedTodos(data);
  };

  const refillTodos = () => {
    fetchTodos(0);
    fetchTodos(1);
  };

  const handleDelete = async (id: number) => {
    const response = await fetch(env.BACKEND_URL + "/api/delete/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) refillTodos();
    else alert("Failed to delete task");
  };

  const handleUpdate = async (id: number, isComplete: boolean) => {
    const response = await fetch(env.BACKEND_URL + "/api/update/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_complete: isComplete }),
    });
    if (response.ok) refillTodos();
    else alert("Failed to complete task");
  };

  useEffect(refillTodos, []);

  return (
    <div className="w-full container md:mx-auto">
      <div className="space-y-4 block mb-8">
        <h1 className="text-5xl text-center my-8">Task Management</h1>
        <div className="flex justify-center content-center mx-auto max-w-[50vw] flex-wrap">
          <AddForm
            callback={() => {
              refillTodos();
            }}
          />
        </div>
      </div>
      <div className="mx-8 sm:mx-0">
        <div className="w-full mx-auto sm:max-w-[50vw]">
          <h3 className="text-lg font-bold text-left mb-4">Ongoing Task</h3>
          <div className="space-y-4 mx-auto sm:max-w-[50vw]">
            {incompleteTodos.map((todo) => (
              <Card
                todo={todo}
                key={todo.id}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
              />
            ))}
          </div>
        </div>
        <div className="w-full mx-auto sm:max-w-[50vw] mt-4">
          <h3 className="text-lg font-bold text-left mb-4">Completed Task</h3>
          <div className="space-y-4 mx-auto sm:max-w-[50vw]">
            {completedTodos.map((todo) => (
              <Card
                todo={todo}
                key={todo.id}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

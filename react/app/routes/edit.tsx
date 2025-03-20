import Card from "components/ui/card";
import { useEffect, useState } from "react";
import type { TTodo } from "types/todo";
import env from "env.json";
import EditForm from "components/organism/edit-form";
import type { Route } from "./+types/edit";
import { useNavigate } from "react-router";

export default function Edit({ params }: Route.LoaderArgs) {
  const [selectedTodo, setSelectedTodo] = useState<TTodo | null>(null);
  const navigate = useNavigate();
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
  useEffect(() => {
    if (params.id) {
      const fetcher = async () => {
        const response = await fetch(
          env.BACKEND_URL + "/api/show/" + params.id
        );
        if (!response.ok) {
          navigate("/add");
          return;
        } else {
          const data = await response.json();
          setSelectedTodo(data);
        }
      };
      fetcher();
    }
  }, []);

  return (
    <div className="w-full container md:mx-auto">
      <div className="space-y-4 block mb-8">
        <h1 className="text-5xl text-center my-8">Task Management</h1>
        <div className="flex justify-center content-center mx-auto max-w-[50vw] flex-wrap">
          <EditForm
            callback={() => {
              refillTodos();
            }}
            todo={selectedTodo}
          />
        </div>
      </div>
      <div className="mx-8 sm:mx-0">
        <div className="w-full mx-auto sm:max-w-[50vw]">
          <h3 className="text-lg font-bold text-left">Ongoing Task</h3>
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
          <h3 className="text-lg font-bold text-left">Completed Task</h3>
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

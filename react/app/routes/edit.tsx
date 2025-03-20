import { useEffect, useState } from "react";
import type { Route } from "./+types/edit";
import type { TTodo } from "types/todo";
import env from "env.json";
import { useNavigate } from "react-router";

export default function Edit({ params }: Route.LoaderArgs) {
  const [selectedTodo, setSelectedTodo] = useState<TTodo | null>(null);
  const [todos, setTodos] = useState<TTodo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      const response = await fetch(env.BACKEND_URL + "/api/show/" + params.id);

      if (!response.ok) navigate("/");

      const data = await response.json();
      setSelectedTodo(data);
    };
    const fetchTodos = async () => {
      const response = await fetch(env.BACKEND_URL + "/api/");

      if (!response.ok) navigate("/");

      const data = await response.json();
      setTodos(data);
    };

    fetchTodo();
    fetchTodos();
  }, []);

  return <div>initialization</div>;
}

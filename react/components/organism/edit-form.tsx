import Input from "components/ui/input";
import { useEffect, useState } from "react";
import env from "env.json";
import { useNavigate } from "react-router";
import type { TTodo } from "types/todo";

export default function EditForm({
  callback,
  todo,
}: {
  callback?: () => void;
  todo: TTodo | null;
}) {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || title.trim() === "" || title.length == 0)
      alert("Title is required");

    await fetch(env.BACKEND_URL + "/api/update/" + todo?.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (callback) callback();
  };

  useEffect(() => {
    if (todo) setTitle(todo.title);
  }, [todo]);

  return (
    <form
      className="col-auto align-middle text-center w-full"
      onSubmit={handleSubmit}
    >
      <div className="row">
        <Input
          name="title"
          type="text"
          label="Title"
          onInput={setTitle}
          value={title}
        />
      </div>
      <div className="row mt-4 space-x-2">
        <button
          type="submit"
          className="bg-orange-400 p-2 px-4 rounded-lg cursor-pointer hover:bg-orange-500"
        >
          Edit Task
        </button>
        <button
          type="button"
          className="bg-red-400 p-2 px-4 rounded-lg cursor-pointer hover:bg-red-500"
          onClick={() => navigate("/add")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

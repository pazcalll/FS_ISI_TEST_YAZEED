import Input from "components/ui/input";
import { useState } from "react";
import env from "env.json";

export default function AddForm({ callback }: { callback?: () => void }) {
  const [title, setTitle] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || title.trim() === "" || title.length == 0)
      alert("Title is required");

    await fetch(env.BACKEND_URL + "/api/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (callback) callback();
  };

  return (
    <form
      className="col-auto align-middle text-center w-full"
      onSubmit={handleSubmit}
    >
      <div className="row">
        <Input name="title" type="text" label="Title" onInput={setTitle} />
      </div>
      <div className="row mt-4">
        <button
          type="submit"
          className="bg-blue-400 p-2 px-4 rounded-lg cursor-pointer hover:bg-blue-500"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}

import { CircleCheckIcon, CircleIcon, CircleXIcon, Pencil } from "lucide-react";
import moment from "moment";
import { useNavigate } from "react-router";
import type { TTodo } from "types/todo";

export type TCard = {
  todo: Partial<TTodo>;
  handleUpdate: (id: number, isComplete: boolean) => void;
  handleDelete: (id: number) => void;
};

export default function Card({ todo, handleDelete, handleUpdate }: TCard) {
  const navigate = useNavigate();
  return (
    <div className="sm:w-[50vw] max-w-[86vw] md:max-w-full p-4 bg-gray-300 rounded-lg shadow-lg flex justify-between">
      <div className="text-left">
        <div className="flex">
          {todo.is_complete ? (
            <s>
              <p>{todo.title}</p>
            </s>
          ) : (
            <p>{todo.title}</p>
          )}
          <Pencil
            size={20}
            className="ml-2 cursor-pointer"
            onClick={() => navigate("/edit/" + todo.id)}
          />
        </div>
        <p>
          <small>{moment(todo.created_at).format("DD MMM YYYY HH:mm")}</small>
        </p>
      </div>
      <div className="text-right justify-center justify-items-center content-center place-content-center">
        <button
          onClick={() => handleDelete(todo.id as number)}
          className="cursor-pointer"
        >
          <CircleXIcon size={26} />
        </button>
        <button
          onClick={() =>
            handleUpdate(todo.id as number, todo.is_complete ? false : true)
          }
          className="cursor-pointer"
        >
          {todo.is_complete ? (
            <CircleCheckIcon size={26} />
          ) : (
            <CircleIcon size={26} fill="white" />
          )}
        </button>
      </div>
    </div>
  );
}

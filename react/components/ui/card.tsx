import { CircleIcon, CircleXIcon } from "lucide-react";
import moment from "moment";
import type { TTodo } from "types/todo";

export type TCard = {
  todo: Partial<TTodo>;
};

export default function Card({ todo }: TCard) {
  return (
    <div className="w-[50vw] max-w-[86vw] md:max-w-full p-4 bg-gray-300 rounded-lg shadow-lg flex justify-between">
      <div className="text-left">
        <p>{todo.title}</p>
        <p>
          <small>{moment(todo.created_at).format("DD MMM YYYY HH:mm")}</small>
        </p>
      </div>
      <div className="text-right justify-center justify-items-center content-center place-content-center">
        <button>
          <CircleXIcon size={26} />
        </button>
        <button>
          <CircleIcon size={26} fill="white" />
        </button>
      </div>
    </div>
  );
}

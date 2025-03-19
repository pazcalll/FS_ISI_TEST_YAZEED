import Card from "components/ui/card";
import type { TTodo } from "types/todo";

export default function Add() {
  const todoInit: TTodo = {
    id: 1,
    title: "Buy milk",
    is_complete: false,
    created_at: "2021-10-10T10:00:00Z",
  };
  return (
    <div className="w-full container mx-auto">
      <div className="flex justify-center">
        <Card todo={todoInit} />
      </div>
    </div>
  );
}

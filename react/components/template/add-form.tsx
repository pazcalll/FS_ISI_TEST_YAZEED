import Input from "components/ui/input";

export default function AddForm() {
  return (
    <form
      className="col-auto align-middle text-center w-full"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="row">
        <Input name="title" type="text" label="Title" />
      </div>
      <div className="row mt-4">
        <button type="submit" className="bg-blue-400 p-2 px-4 rounded-lg">
          Add Task
        </button>
      </div>
    </form>
  );
}

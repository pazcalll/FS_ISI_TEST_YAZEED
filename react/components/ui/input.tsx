export type TInput = {
  name: string;
  type: string | undefined;
  label: string | undefined;
  value: any;
  placeholder: string | undefined;
  onInput: (e: any) => void;
};

export default function Input({
  name,
  type,
  value,
  placeholder,
  label,
  onInput,
}: TInput) {
  return (
    <div className="text-left">
      <label htmlFor={name}>{label ?? name}</label>
      <input
        type={type ?? "text"}
        id={name}
        name={name}
        className="w-full bg-white border border-solid border-gray-400 rounded-lg p-2"
        placeholder={placeholder}
        value={value}
        onInput={(e) => onInput(e.target.value)}
      />
    </div>
  );
}

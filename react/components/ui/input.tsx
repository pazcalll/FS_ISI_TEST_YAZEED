export type TInput = {
  name: string;
  type: string | undefined;
  label: string | undefined;
  value: any;
  placeholder: string | undefined;
};

export default function Input({
  name,
  type,
  value,
  placeholder,
  label,
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
      />
    </div>
  );
}

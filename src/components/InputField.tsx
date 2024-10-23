import { FieldError } from "react-hook-form";

type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
  register: any;
  defaultValue?: string;
  error?: FieldError;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputField = ({
  label,
  name,
  type = "text",
  register,
  defaultValue,
  error,
  inputProps,
}: InputFieldProps) => {
  return (
    <div className="username flex w-full flex-col gap-2 md:w-1/4">
      <label htmlFor={name} className="text-xs text-gray-500">
        {label}
      </label>
      <input
        type={type}
        id={name}
        className="w-full rounded-md p-2 text-sm ring-[1.5px] ring-gray-300"
        {...register(name)}
        defaultValue={defaultValue}
        {...inputProps}
      />
      {error?.message && (
        <p className="text-xs text-red-500">{String(error.message)}</p>
      )}
    </div>
  );
};

export default InputField;

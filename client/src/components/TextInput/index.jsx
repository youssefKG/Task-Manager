import { useField } from "formik";

const TextInput = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col gap-1">
      <input
        {...props}
        {...field}
        className="bg-white/0 border-b-[1px] border-gray-600 flex-1 p-2
                focus:outline-none tracking-wide placeholder  "
      />
      {meta.touched && meta.error ? (
        <p className="text-xs text-red-400">{meta.error}</p>
      ) : null}
    </div>
  );
};

export default TextInput;

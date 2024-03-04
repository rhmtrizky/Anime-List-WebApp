const Input = (props) => {
  const { label, type, name, placeholder, onChange } = props;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <input
        onChange={onChange}
        className="w-full border-2 border-color-gray px-2 py-1 rounded-md"
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;

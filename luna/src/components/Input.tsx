interface InputProps {
  custom?: string;
  label?: string;
  typeUse?: string;
  value?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  label = "",
  custom,
  typeUse,
  value,
  onChange,
  name,
}: InputProps) => {
  return (
    <div>
      <p>{label}</p>
      <input
        type={typeUse}
        name={name}
        value={value}
        onChange={onChange}
        className={`${
          custom ? custom : "w-[383px] h-[20px]"
        } p-[20px] rounded-2xl border border-black`}
      />
    </div>
  );
};

export default Input;

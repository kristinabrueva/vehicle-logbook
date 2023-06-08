interface SelectProps {
  name: string;
  required?: boolean;
  value: string;
  options: string[];
  type?: "button" | "submit" | "reset" | undefined;
  handleChange?: (e: any) => void;
}

const Select = ({
  name,
  required = true,
  value,
  options,
  handleChange,
}: SelectProps): JSX.Element => (
  <select
    id={name}
    name={name}
    value={value}
    required={required}
    onChange={handleChange}
    className="block border-2 max-w-[160px] text-left text-base"
  >
    <option disabled={true} value="">
      {name}
    </option>
    {options.map((i) => (
      <option key={i} value={i}>
        {i}
      </option>
    ))}
  </select>
);

export default Select;

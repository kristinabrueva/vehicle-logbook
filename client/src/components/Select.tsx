import React from "react";

interface SelectProps {
  name: string;
  required?: boolean;
  value: string;
  options: string[];
  testId: string;
  type?: "button" | "submit" | "reset" | undefined;
  handleChange?: (e: any) => void;
}

const Select = ({
  name,
  required = true,
  value,
  options,
  testId,
  handleChange,
}: SelectProps): JSX.Element => (
  <select
    id={name}
    data-testid={testId}
    name={name}
    defaultValue={value}
    required={required}
    onChange={handleChange}
    className="block border-2 max-w-[160px] text-left text-base"
  >
    <option disabled value="default" hidden>
      {name}
    </option>
    {options.map((i, key) => (
      <option key={key} value={i}>
        {i}
      </option>
    ))}
  </select>
);

export default Select;

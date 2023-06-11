import React from "react";
interface ButtonProps {
  id?: any;
  inline?: Boolean;
  text: String;
  type?: "button" | "submit" | "reset" | undefined;
  handleClick?: (e: any) => void;
}

const Button = ({
  id,
  inline,
  type,
  text,
  handleClick,
}: ButtonProps): JSX.Element => (
  <>
    <button
      type={type}
      className={`border-[1px] rounded-sm text-sm px-2 bg-gray-100 border-black py-1 max-w-fit ${
        inline ? "inline" : "block"
      }`}
      id={id}
      data-testid="testButton"
      onClick={handleClick}
    >
      {text}
    </button>
  </>
);

export default Button;

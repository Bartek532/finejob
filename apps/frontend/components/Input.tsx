import type { TextInputProps } from "../types";

export const Input = ({ type = "text", name, inputRef }: TextInputProps) => {
  return (
    <fieldset className="field">
      <input type={type} name={name} id={name} ref={inputRef} />
      <label htmlFor={name}>{name}</label>
    </fieldset>
  );
};

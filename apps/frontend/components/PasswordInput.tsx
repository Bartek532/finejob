import type { PasswordInputProps } from "../types";

export const PasswordInput = ({ inputRef }: PasswordInputProps) => {
  return (
    <fieldset className="field">
      <input type="password" ref={inputRef} name="password" id="password" />
      <label htmlFor="password">Password</label>
    </fieldset>
  );
};

import type { PasswordInputProps } from "../../types";
import styles from "./Input.module.scss";
import { ChangeEvent, useState } from "react";
import classnames from "classnames";

export const PasswordInput = ({ inputRef }: PasswordInputProps) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <fieldset className={styles.field}>
      <input
        type="password"
        ref={inputRef}
        name="password"
        id="password"
        className={styles.input}
        onChange={handleInputChange}
        value={inputValue}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
      />
      <label
        htmlFor="password"
        className={classnames(styles.label, {
          [styles.focused]: isInputFocused || inputValue.length > 0,
        })}
      >
        Password
      </label>
    </fieldset>
  );
};

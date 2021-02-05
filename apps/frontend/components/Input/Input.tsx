import type { TextInputProps } from "../../types";
import styles from "./Input.module.scss";
import { ChangeEvent, useState } from "react";
import classnames from "classnames";

export const Input = ({ type = "text", name, inputRef }: TextInputProps) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <fieldset className={styles.field}>
      <input
        type={type}
        name={name}
        id={name}
        value={inputValue}
        onChange={handleInputChange}
        ref={inputRef}
        className={styles.input}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
      />
      <label
        htmlFor={name}
        className={classnames(styles.label, {
          [styles.focused]: isInputFocused || inputValue.length > 0,
        })}
      >
        {name}
      </label>
    </fieldset>
  );
};

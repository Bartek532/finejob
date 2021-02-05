import type { TextInputProps } from "../../types";
import styles from "./Input.module.scss";
import { ChangeEvent, useState, useCallback } from "react";
import classnames from "classnames";

export const Input = ({
  type = "text",
  name,
  inputRef,
  error,
}: TextInputProps) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  return (
    <div className={styles.field}>
      <label htmlFor={name} className={styles.wrapper}>
        <span
          className={classnames(styles.placeholder, {
            [styles.focused]: isInputFocused || inputValue.length > 0,
          })}
        >
          {name}
        </span>
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
      </label>
      {error ? <span className={styles.error}>{error.message}</span> : null}
    </div>
  );
};

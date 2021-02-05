import type { PasswordInputProps } from "../../types";
import styles from "./Input.module.scss";
import { ChangeEvent, useState, useCallback } from "react";
import classnames from "classnames";

export const PasswordInput = ({ inputRef, error }: PasswordInputProps) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [password, setPassword] = useState("");

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  return (
    <div className={styles.field}>
      <label htmlFor="password" className={styles.wrapper}>
        <span
          className={classnames(styles.placeholder, {
            [styles.focused]: isInputFocused || password.length > 0,
          })}
        >
          Password
        </span>
        <input
          type="password"
          ref={inputRef}
          name="password"
          id="password"
          className={styles.input}
          onChange={handleInputChange}
          value={password}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
      </label>
      {error ? <span className={styles.error}>{error.message}</span> : null}
    </div>
  );
};

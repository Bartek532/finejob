import type { TextInputProps } from "../../types";
import styles from "./Input.module.scss";
import { ChangeEvent, useState, useCallback } from "react";
import Eye from "../../public/icons/password/eye.svg";
import ClosedEye from "../../public/icons/password/eye-closed.svg";
import classnames from "classnames";

export const Input = ({
  type = "text",
  name,
  inputRef,
  error,
  onChange,
  value,
}: TextInputProps) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [localInputValue, setlocalInputValue] = useState("");
  const [inputType, setInputType] = useState(type);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setlocalInputValue(e.target.value);
  }, []);

  return (
    <div className={styles.field}>
      <label htmlFor={name} className={styles.wrapper}>
        <span
          className={classnames(styles.placeholder, {
            [styles.focused]: isInputFocused || localInputValue.length > 0,
          })}
        >
          {name}
        </span>
        <input
          type={inputType}
          name={name}
          id={name}
          value={value || localInputValue}
          onChange={onChange || handleInputChange}
          ref={inputRef}
          className={classnames(styles.input, {
            [styles.withIcon]: name === "password",
          })}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
        {name === "password" ? (
          inputType === "password" ? (
            <button
              className={styles.eye}
              type="button"
              onClick={() => setInputType("text")}
            >
              <ClosedEye />
            </button>
          ) : (
            <button
              className={styles.eye}
              type="button"
              onClick={() => setInputType("password")}
            >
              <Eye />
            </button>
          )
        ) : null}
      </label>
      {error ? <span className={styles.error}>{error.message}</span> : null}
    </div>
  );
};

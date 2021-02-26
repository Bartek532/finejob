import type { TextInputProps } from "../../types";
import styles from "./Input.module.scss";
import { useState, memo } from "react";
import Eye from "../../public/icons/password/eye.svg";
import ClosedEye from "../../public/icons/password/eye-closed.svg";
import classnames from "classnames";

export const Input = memo<TextInputProps>(
  ({
    type = "text",
    name,
    inputRef,
    error,
    onChange,
    value,
    placeholder,
    shouldBeFocused = false,
  }) => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [inputType, setInputType] = useState(type);

    return (
      <div className={styles.field}>
        <label htmlFor={name} className={styles.wrapper}>
          <span
            className={classnames(styles.placeholder, {
              [styles.focused]: isInputFocused || shouldBeFocused,
            })}
          >
            {placeholder || name}
          </span>
          <input
            type={inputType}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            ref={inputRef}
            className={classnames(styles.input, {
              [styles.withIcon]: name === "password",
            })}
            onFocus={() => setIsInputFocused(true)}
          />
          {name.includes("password") ? (
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
  },
);

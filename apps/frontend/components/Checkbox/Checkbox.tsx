import styles from "./Checkbox.module.scss";
import { memo } from "react";

type CheckboxProps = {
  readonly label: string;
  readonly value?: string;
  readonly name: string;
  readonly checked?: boolean;
  readonly inputRef?: any;
};

export const Checkbox = memo<CheckboxProps>(
  ({ label, value, name, checked, inputRef }) => {
    return (
      <label className={styles.container}>
        <input
          type="radio"
          className={styles.input}
          name={name}
          value={value || label}
          defaultChecked={checked}
          ref={inputRef}
        />
        <span className={styles.checkmark}></span>
        {label}
      </label>
    );
  },
);

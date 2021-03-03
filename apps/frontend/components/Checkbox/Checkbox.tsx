import styles from "./Checkbox.module.scss";
import { memo } from "react";

type CheckboxProps = {
  readonly label: string;
  readonly value?: string;
  readonly name: string;
};

export const Checkbox = memo<CheckboxProps>(({ label, value, name }) => {
  return (
    <label className={styles.container}>
      <input type="radio" className={styles.input} name={name} />
      <span className={styles.checkmark}></span>
      {label}
    </label>
  );
});

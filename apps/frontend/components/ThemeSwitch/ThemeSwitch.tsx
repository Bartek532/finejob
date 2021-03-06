import styles from "./ThemeSwitch.module.scss";
import { memo } from "react";
import Image from "next/image";

export const ThemeSwitch = memo(() => {
  return (
    <label className={styles.switch}>
      <input type="checkbox" className={styles.input} />
      <div className={styles.slider}>
        <div className={styles.circle}>
          <Image src="/icons/theme/light.svg" width={14} height={14} />
        </div>
      </div>
    </label>
  );
});

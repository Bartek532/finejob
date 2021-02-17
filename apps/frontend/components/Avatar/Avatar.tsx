import { memo } from "react";
import styles from "./Avatar.module.scss";
import { logoColors } from "../../lib/utils/consts";

export const Avatar = memo(({ img, name }: { img?: string; name?: string }) => {
  const splittedName = name.split(" ");

  if (img) {
    return (
      <div
        className={styles.logo}
        style={{ backgroundImage: `url(${img})` }}
      ></div>
    );
  }

  return (
    <div
      className={styles.logo}
      style={{
        backgroundColor: `#${
          logoColors[Math.floor(Math.random() * logoColors.length)]
        }`,
      }}
    >
      {splittedName[0][0] +
        (splittedName[1] ? splittedName[1][0] : splittedName[0][1])}
    </div>
  );
});
import { memo } from "react";
import styles from "./Avatar.module.scss";
import { logoColors } from "../../lib/utils/consts";
import Image from "next/image";

type AvatarProps = { readonly img?: string; readonly name?: string };

export const Avatar = memo<AvatarProps>(({ img, name }) => {
  if (img) {
    return (
      <div className={styles.logo}>
        <Image src={img} layout="fill" alt={name || "company logo"} />
      </div>
    );
  }

  if (name) {
    const splittedName = name.trim().split(" ");

    return (
      <div
        className={styles.logo}
        style={{
          backgroundColor: `#${
            logoColors[Math.floor(Math.random() * logoColors.length)]
          }`,
        }}
      >
        <span className="sr-only">company initials</span>
        {splittedName[0][0] +
          (splittedName[1] ? splittedName[1][0] : splittedName[0][1])}
      </div>
    );
  }

  return null;
});

Avatar.displayName = "Avatar";

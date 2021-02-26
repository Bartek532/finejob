import { memo } from "react";
import styles from "./MainButton.module.scss";
import Image from "next/image";

type MainButtonProps = {
  readonly text?: string;
  readonly icon?: string;
  readonly type: "submit" | "reset" | "button";
  readonly onClick?: () => void;
};

export const MainButton = memo<MainButtonProps>(
  ({ text, icon, type, onClick }) => {
    return (
      <button className={styles.btn} type={type} onClick={onClick}>
        {text ? (
          text
        ) : (
          <Image
            src={`/icons/buttons/${icon}.svg`}
            alt={icon}
            width={16}
            height={16}
          />
        )}
      </button>
    );
  },
);

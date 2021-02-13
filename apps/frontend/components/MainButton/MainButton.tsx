import styles from "./MainButton.module.scss";
import Image from "next/image";

export const MainButton = ({
  text,
  icon,
  type,
  onClick,
}: {
  text?: string;
  icon?: string;
  type?: "submit" | "reset";
  onClick?: () => void;
}) => {
  return (
    <button className={styles.btn} type={type || "button"} onClick={onClick}>
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
};

import styles from "./MainButton.module.scss";
import Image from "next/image";

export const MainButton = ({
  text,
  icon,
  type,
}: {
  text?: string;
  icon?: string;
  type?: "submit" | "reset";
}) => {
  return (
    <button className={styles.btn} type={type || "button"}>
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

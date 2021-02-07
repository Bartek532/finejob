import styles from "./MainButton.module.scss";
import Image from "next/image";

export const MainButton = ({
  text,
  icon,
  role,
}: {
  text?: string;
  icon?: string;
  role?: string;
}) => {
  return (
    <button className={styles.btn} role={role || ""}>
      {text ? (
        text
      ) : (
        <Image src={`/icons/buttons/${icon}.svg`} alt={icon} layout="fill" />
      )}
    </button>
  );
};

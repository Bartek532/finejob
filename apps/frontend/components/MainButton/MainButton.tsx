import styles from "./MainButton.module.scss";

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
        <img
          src={require(`../../assets/icons/buttons/${icon}.svg`).default}
          alt={icon}
        />
      )}
    </button>
  );
};

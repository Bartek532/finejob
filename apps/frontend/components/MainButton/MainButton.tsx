import styles from "./MainButton.module.scss";

export const MainButton = ({
  text,
  icon,
}: {
  text?: string;
  icon?: string;
}) => {
  return (
    <button className={styles.btn}>
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

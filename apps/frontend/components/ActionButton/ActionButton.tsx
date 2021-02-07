import styles from "./ActionButton.module.scss";
import classnames from "classnames";
import Image from "next/image";

type ButtonIcons = "search" | "back" | "forward" | "edit";

export const ActionButton = ({
  icon,
  corner,
}: {
  icon: ButtonIcons;
  corner: boolean;
}) => {
  return (
    <button
      className={classnames(styles.btn, { [styles.corner]: corner })}
      type="button"
    >
      <Image
        src={`/icons/buttons/${icon}.svg`}
        alt={icon}
        width={10}
        height={15}
        loading="lazy"
      />
    </button>
  );
};

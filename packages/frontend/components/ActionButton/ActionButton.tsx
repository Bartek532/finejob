import styles from "./ActionButton.module.scss";
import classnames from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";

type ButtonIcons = "search" | "back" | "forward" | "edit";

export const ActionButton = ({
  icon,
  corner,
  type = "button",
}: {
  icon: ButtonIcons;
  corner?: boolean;
  type?: "submit" | "reset" | "button";
}) => {
  const router = useRouter();
  return (
    <button
      className={classnames(styles.btn, { [styles.corner]: corner })}
      type={type}
      onClick={icon === "back" ? () => router.back() : () => false}
    >
      <Image
        src={`/icons/buttons/${icon}.svg`}
        alt={icon}
        width={12}
        height={12}
        loading="lazy"
      />
    </button>
  );
};

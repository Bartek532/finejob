import styles from "./ActionButton.module.scss";
import classnames from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";

type ButtonIcons = "search" | "back" | "forward" | "edit";

export const ActionButton = ({
  icon,
  corner,
}: {
  icon: ButtonIcons;
  corner: boolean;
}) => {
  const router = useRouter();
  return (
    <button
      className={classnames(styles.btn, { [styles.corner]: corner })}
      type="button"
      onClick={icon === "back" ? () => router.back() : () => false}
    >
      <Image
        src={`/icons/buttons/${icon}.svg`}
        alt={icon}
        width={20}
        height={20}
        loading="lazy"
      />
    </button>
  );
};

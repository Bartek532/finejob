import { memo } from "react";
import styles from "./ActionButton.module.scss";
import classnames from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";

type ActionButtonProps = {
  readonly icon: "search" | "back" | "forward" | "edit";
  readonly corner?: boolean;
  readonly type?: "submit" | "reset" | "button";
};

export const ActionButton = memo<ActionButtonProps>(
  ({ icon, corner, type = "button" }) => {
    const router = useRouter();
    return (
      <button
        className={classnames(styles.btn, { [styles.corner]: corner })}
        type={type}
        onClick={icon === "back" ? () => router.back() : () => false}
      >
        <span className="sr-only">{icon}</span> 
        <Image
          src={`/icons/buttons/${icon}.svg`}
          alt=""
          width={12}
          height={12}
          loading="lazy"
        />
      </button>
    );
  },
);

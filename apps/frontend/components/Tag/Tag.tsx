import { memo } from "react";
import styles from "./Tag.module.scss";

type TagProps = {
  readonly name: string;
  readonly onClick: (name: string) => void;
};

export const Tag = memo<TagProps>(({ name, onClick }) => {
  return (
    <button className={styles.tag} onClick={() => onClick(name)}>
      {name}
    </button>
  );
});

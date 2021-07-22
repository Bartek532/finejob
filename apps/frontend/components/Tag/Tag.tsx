import { memo } from "react";
import styles from "./Tag.module.scss";

type TagProps = { readonly name: string };

export const Tag = memo<TagProps>(({ name }) => {
  return <button className={styles.tag}>{name}</button>;
});

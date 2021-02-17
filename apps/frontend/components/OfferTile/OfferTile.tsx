import type { Offer } from "../../types";
import styles from "./OfferTile.module.scss";
import { ActionButton } from "../ActionButton/ActionButton";
import { Avatar } from "../Avatar/Avatar";

type OfferTileProps = Pick<Offer, "title" | "company" | "location" | "salary">;

export const OfferTile = ({
  title,
  company,
  location,
  salary,
}: OfferTileProps) => {
  return (
    <article className={styles.offer}>
      <div className={styles.logo}>
        <Avatar name={company} />
      </div>
      <div className={styles.description}>
        <h4 className={styles.title}>
          {title.length > 20 ? title.slice(0, 17) + "..." : title}
        </h4>
        <span className={styles.company}>
          {company.length > 19 ? company.slice(0, 16) + "..." : company}
        </span>
        <span className={styles.location}>
          {location.length > 20 ? location.slice(0, 17) + "..." : location}
        </span>
      </div>
      <span className={styles.salary}>${salary}</span>
      <div className={styles.btn}>
        <ActionButton icon="forward" />
      </div>
    </article>
  );
};

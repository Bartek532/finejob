import type { Offer } from "../../types";
import styles from "./OfferTile.module.scss";
import { ActionButton } from "../ActionButton/ActionButton";
import Link from "next/link";
import { useRouter } from "next/router";
import { Avatar } from "../Avatar/Avatar";

type OfferTileProps = Pick<
  Offer,
  "title" | "company" | "location" | "salary" | "company_url" | "id"
>;

export const OfferTile = ({
  id,
  title,
  company,
  location,
  salary,
  company_url,
}: OfferTileProps) => {
  const router = useRouter();

  const handleOfferPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "enter") {
      router.push(`/offers/${id}`);
    }
  };

  return (
    <Link href={`/offers/${id}`}>
      <article
        className={styles.offer}
        tabIndex={0}
        onKeyPress={handleOfferPress}
      >
        <div className={styles.logo}>
          <Avatar name={company} />
        </div>
        <div className={styles.description}>
          <div className={styles.wrapper}>
            <h4 className={styles.title}>
              {title.length > 20 ? title.slice(0, 17) + "..." : title}
            </h4>
            <span className={styles.label}>job</span>
          </div>
          <div className={styles.wrapper}>
            <span className={styles.company}>
              {company.length > 19 ? company.slice(0, 16) + "..." : company}
            </span>
            <span className={styles.label}>Company</span>
          </div>
          <div className={styles.wrapper}>
            <span className={styles.location}>
              {location.length > 20 ? location.slice(0, 17) + "..." : location}
            </span>
            <span className={styles.label}>Location</span>
          </div>
        </div>
        <span className={styles.salary}>${salary}</span>
        <Link href={company_url || "#"}>
          <a className={styles.btn} tabIndex={-1}>
            <ActionButton icon="forward" />
          </a>
        </Link>
      </article>
    </Link>
  );
};

import { memo } from "react";
import type { OfferWithSalary } from "@finejob/types";
import styles from "./OfferTile.module.scss";
import { ActionButton } from "../ActionButton/ActionButton";
import Link from "next/link";
import { Avatar } from "../Avatar/Avatar";

type OfferTileProps = Pick<
  OfferWithSalary,
  "id" | "title" | "company" | "location" | "salary" | "company_url"
>;

export const OfferTile = memo<OfferTileProps>(
  ({ id, title, company, location, salary, company_url }) => {
    return (
      <Link href={`/offers/${id}`}>
        <a>
          <article className={styles.offer}>
            <div className={styles.logo}>
              <Avatar name={company} />
            </div>
            <div className={styles.description}>
              <div className={styles.wrapper}>
                <span className="sr-only">job title</span>
                <h4 className={styles.title}>
                  {title.length > 20 ? title.slice(0, 17) + "..." : title}
                </h4>
                <span className={styles.label}>job</span>
              </div>
              <div className={styles.wrapper}>
                <span className="sr-only">company</span>

                <span className={styles.company}>
                  {company.length > 19 ? company.slice(0, 16) + "..." : company}
                </span>
                <span className={styles.label}>Company</span>
              </div>
              <div className={styles.wrapper}>
                <span className="sr-only">location</span>
                <span className={styles.location}>
                  {location.length > 20
                    ? location.slice(0, 17) + "..."
                    : location}
                </span>
                <span className={styles.label}>Location</span>
              </div>
            </div>

            <span className="sr-only">salary</span>

            <span className={styles.salary}>${salary}</span>
            {company_url ? (
              <Link href={company_url}>
                <span className={styles.btn}>
                  <ActionButton icon="forward" />
                </span>
              </Link>
            ) : null}
          </article>
        </a>
      </Link>
    );
  },
);

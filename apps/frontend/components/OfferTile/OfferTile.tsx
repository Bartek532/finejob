import { memo } from "react";
import type { OfferWithSalary } from "@finejob/types";
import styles from "./OfferTile.module.scss";
import { ActionButton } from "../ActionButton/ActionButton";
import Link from "next/link";
import { Avatar } from "../Avatar/Avatar";
import Company from "../../public/icons/offer/company.svg";
import Location from "../../public/icons/offer/location.svg";
import { addCommasToNumber } from "../../lib/utils/functions";

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
                  {title.length > 120 ? title.slice(0, 117) + "..." : title}
                </h4>
              </div>
              <div className={styles.additional}>
                <div className={styles.wrapper}>
                  <span className="sr-only">company</span>

                  <span className={styles.company}>
                    <Company className={styles.icon} />
                    {company.length > 39
                      ? company.slice(0, 36) + "..."
                      : company}
                  </span>
                </div>
                <div className={styles.wrapper}>
                  <span className="sr-only">location</span>

                  <span className={styles.location}>
                    <Location className={styles.icon} />
                    {location.length > 50
                      ? location.slice(0, 47) + "..."
                      : location}
                  </span>
                </div>
              </div>
            </div>

            <span className="sr-only">salary</span>

            <span className={styles.salary}>${addCommasToNumber(salary)}</span>
            {company_url ? (
              <Link href={company_url}>
                <span className={styles.btn}>
                  <span className="sr-only">go to company site</span>
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

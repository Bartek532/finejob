import styles from "./SingleOffer.module.scss";
import { Avatar } from "../../components/Avatar/Avatar";
import { MainButton } from "../../components/MainButton/MainButton";
import { ActionButton } from "../../components/ActionButton/ActionButton";
import { Modal } from "../../components/Modal/Modal";
import { OfferControls } from "../../components/OfferControls/OfferControls";
import type { OfferWithSalary } from "@finejob/types";
import { memo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import classnames from "classnames";
import { prepareQueryToSearch } from "../../lib/utils/functions";

import Moment from "react-moment";

type SingleOfferProps = { readonly offer: OfferWithSalary };

export const SingleOffer = memo<SingleOfferProps>(({ offer }) => {
  const router = useRouter();

  const info = [
    { type: "location", value: offer.location },
    { type: "type", value: offer.type },
    { type: "salary", value: offer.salary + " $" },
  ];

  const handleSearchByCompany = useCallback(() => {
    router.replace({
      pathname: "/offers",
      query: { q: prepareQueryToSearch(offer.company) },
    });
  }, [offer.company]);

  const handleSearchByField = useCallback(
    (key: string) => {
      if (key === "type" && offer.type === "Full Time") {
        router.replace({
          pathname: "/offers",
          query: { full_time: true },
        });
      } else if (key === "location") {
        router.replace({
          pathname: "/offers",
          query: { location: prepareQueryToSearch(offer.location) },
        });
      }
    },
    [offer.type, offer.location],
  );

  return (
    <>
      <Modal />
      <section className={styles.offer}>
        <ActionButton icon="back" corner />
        <OfferControls offer={offer} />
        <article className={styles.main}>
          <div className={styles.logo}>
            <Avatar name={offer.company} />
          </div>
          <span className="sr-only">job title</span>
          <span className={styles.title}>{offer.title}</span>

          <span className="sr-only">company</span>
          <button className={styles.company} onClick={handleSearchByCompany}>
            {offer.company}
          </button>
        </article>

        <div className={styles.more}>
          {info.map((item) => (
            <div className={styles.field} key={item.type}>
              <span className="sr-only">{item.type}</span>

              {["type", "location"].includes(item.type) ? (
                <button
                  className={classnames(styles.description, styles.searchBtn)}
                  onClick={() => handleSearchByField(item.type)}
                >
                  {item.value}
                </button>
              ) : (
                <span className={styles.description}>{item.value}</span>
              )}

              <div className={styles.icon}>
                <Image
                  src={`/icons/offer/${item.type}.svg`}
                  alt={item.type}
                  width={25}
                  height={25}
                />
              </div>
            </div>
          ))}
        </div>

        <div className={styles.content}>
          <span className={styles.date}>
            Created:{" "}
            <Moment date={offer.created_at} format="dddd DD/MM/YY hh:mm A" />
          </span>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: offer.description }}
          ></div>
        </div>

        <div className={styles.apply}>
          <span className={styles.label}>How to apply:</span>
          <div
            dangerouslySetInnerHTML={{ __html: offer.how_to_apply }}
            className={styles.link}
          ></div>
        </div>
        {offer.company_url ? (
          <Link href={offer.company_url}>
            <a>
              <MainButton text="Go to company site" />
            </a>
          </Link>
        ) : null}
      </section>
    </>
  );
});

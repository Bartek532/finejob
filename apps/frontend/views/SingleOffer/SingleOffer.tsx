import styles from "./SingleOffer.module.scss";
import { Avatar } from "../../components/Avatar/Avatar";
import { Tag } from "../../components/Tag/Tag";
import { MainButton } from "../../components/MainButton/MainButton";
import { ActionButton } from "../../components/ActionButton/ActionButton";
import { Modal } from "../../components/Modal/Modal";
import { OfferControls } from "../../components/OfferControls/OfferControls";
import type { Offer } from "@finejob/types";
import { memo, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import classnames from "classnames";
import dayjs from "dayjs";
import { prepareQueryToSearch } from "../../lib/utils/functions";

type SingleOfferProps = { readonly offer: Offer };

export const SingleOffer = memo<SingleOfferProps>(({ offer }) => {
  const router = useRouter();

  console.log(offer.skills);

  const info = [
    { type: "location", value: offer.city },
    { type: "level", value: offer.experience_level },
    { type: "salary", value: offer.salary + " $" },
  ];

  const handleSearchByCompany = useCallback(() => {
    router.replace({
      pathname: "/offers",
      query: { q: prepareQueryToSearch(offer.company_name) },
    });
  }, [offer.company_name]);

  const handleSearchByField = useCallback(
    (key: string) => {
      if (key === "level") {
        router.replace({
          pathname: "/offers",
          query: { q: prepareQueryToSearch(offer.experience_level) },
        });
      } else if (key === "location") {
        router.replace({
          pathname: "/offers",
          query: { location: prepareQueryToSearch(offer.city) },
        });
      }
    },
    [offer.experience_level, offer.city],
  );

  const handleSearchByTag = useCallback(
    (name: string) => {
      router.replace({
        pathname: "/offers",
        query: { skill: prepareQueryToSearch(name) },
      });
    },
    [offer.skills],
  );

  return (
    <>
      <Modal />
      <section className={styles.offer}>
        <ActionButton icon="back" corner />
        <OfferControls offer={offer} />
        <article className={styles.main}>
          <div className={styles.logo}>
            <Avatar name={offer.company_name} />
          </div>
          <span className="sr-only">job title</span>
          <span className={styles.title}>{offer.title}</span>

          <span className="sr-only">company</span>
          <button className={styles.company} onClick={handleSearchByCompany}>
            {offer.company_name}
          </button>
        </article>

        <div className={styles.more}>
          {info.map((item) => (
            <div className={styles.field} key={item.type}>
              <span className="sr-only">{item.type}</span>
              {["level", "location"].includes(item.type) ? (
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
            <span>Created: </span>
            <time>
              {dayjs(offer.published_at).format("dddd DD/MM/YY h:m A")}
            </time>
          </span>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: offer.body }}
          ></div>
        </div>
        <div className={styles.tags}>
          {offer.skills.map((skill) => (
            <Tag name={skill.name} onClick={handleSearchByTag} />
          ))}
        </div>
        {offer.company_url ? (
          <a href={offer.company_url} rel="noopener">
            <MainButton text="Go to company site" />
          </a>
        ) : null}
      </section>
    </>
  );
});

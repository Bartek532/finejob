import styles from "./SingleOffer.module.scss";
import { Avatar } from "../../components/Avatar/Avatar";
import { MainButton } from "../../components/MainButton/MainButton";
import { ActionButton } from "../../components/ActionButton/ActionButton";
import { UserAPI } from "../../lib/api/user";
import { Modal } from "../../components/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import type { Offer } from "../../types";
import { useEffect, useState } from "react";
import { getModalInfo } from "../../store/mainSlice";
import Image from "next/image";
import Link from "next/link";
import { fetcher } from "../../lib/utils/fetcher";

export const SingleOffer = ({ offer }: { offer: Offer }) => {
  const dispatch = useDispatch();
  const modal = useSelector(getModalInfo);
  const [isSaved, setIsSaved] = useState(false);

  const info = [
    { type: "location", value: offer.location },
    { type: "type", value: offer.type },
    { type: "salary", value: offer.salary + " $" },
  ];

  useEffect(() => {
    async function checkIsSaved() {
      try {
        await fetcher(`/api/offers/saved-offer/${offer.id}`, "GET");
        setIsSaved(true);
      } catch {
        setIsSaved(false);
      }
    }
    checkIsSaved();
  }, []);

  useEffect(() => {
    if (modal.show && modal.type === "success") {
      if (!isSaved) {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
    }
  }, [modal]);

  const handleSaveOffer = () => {
    dispatch(UserAPI.saveOffer(offer.id));
  };

  const handleUnsaveOffer = () => {
    dispatch(UserAPI.unsaveOffer(offer.id));
  };

  return (
    <>
      <Modal />
      <section className={styles.offer}>
        <ActionButton icon="back" corner />

        <button
          className={styles.save}
          onClick={isSaved ? handleUnsaveOffer : handleSaveOffer}
        >
          <Image
            src={`/icons/offer/${isSaved ? "save" : "empty-save"}.svg`}
            alt="save"
            width={24}
            height={24}
          />
        </button>

        <article className={styles.main}>
          <div className={styles.logo}>
            <Avatar name={offer.company} />
          </div>
          <span className={styles.title}>{offer.title}</span>
          <span className={styles.company}>{offer.company}</span>
        </article>

        <div className={styles.more}>
          {info.map(item => (
            <div className={styles.field} key={item.type}>
              <span className={styles.description}>{item.value}</span>
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
            Updated: {offer.created_at.slice(0, 20)}
          </span>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: offer.description || "xd" }}
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
};

import styles from "./Recommended.module.scss";
import Forward from "../../public/icons/buttons/forward.svg";
import Back from "../../public/icons/buttons/back.svg";
import { Avatar } from "../../components/Avatar/Avatar";
import { useState, useEffect, useCallback, memo, useRef } from "react";
import Link from "next/link";
import type { OfferWithSalary } from "@finejob/types";
import classnames from "classnames";
import { addCommasToNumber } from "../../lib/utils/functions";

type RecommendedSectionProps = {
  readonly offers: OfferWithSalary[];
};

export const Recommended = memo<RecommendedSectionProps>(({ offers }) => {
  const [scroll, setScroll] = useState(0);
  const [offersWrapperWidth, setOffersWrapperWidth] = useState(0);
  const baseScrollValue = 450;
  const allOffersWidth = 290 * offers.length; //element total width * elements
  const maxScroll = allOffersWidth - offersWrapperWidth;
  const offersContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setScroll(0);
      setOffersWrapperWidth(
        offersContainerRef.current?.getBoundingClientRect().width!,
      );
    };

    setOffersWrapperWidth(
      offersContainerRef.current?.getBoundingClientRect().width!,
    );
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScrollLeft = useCallback(() => {
    const { x } = offersContainerRef.current?.getBoundingClientRect()!;
    if (x + baseScrollValue >= 0) {
      setScroll(0);
    } else {
      setScroll((scroll) => scroll + baseScrollValue);
    }
  }, [scroll]);

  const handleScrollRight = useCallback(() => {
    const { x } = offersContainerRef.current?.getBoundingClientRect()!;
    if (x - baseScrollValue <= -maxScroll) {
      setScroll(-maxScroll);
    } else {
      setScroll((scroll) => scroll - baseScrollValue);
    }
  }, [scroll]);

  return (
    <section className={styles.recommended}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Recommended Jobs</h2>

        {scroll !== 0 ? (
          <button
            className={classnames(styles.scrollLeft, styles.btn)}
            onClick={handleScrollLeft}
          >
            <span className="sr-only">scroll left</span>
            <Back className={styles.icon} />
          </button>
        ) : null}

        {scroll !== -maxScroll ? (
          <button
            className={classnames(styles.scrollRight, styles.btn)}
            onClick={handleScrollRight}
          >
            <span className="sr-only">scroll right</span>
            <Forward className={styles.icon} />
          </button>
        ) : null}

        <div
          className={styles.offers}
          style={{ transform: `translateX(${scroll}px)` }}
          ref={offersContainerRef}
        >
          {offers.map((offer) => (
            <Link href={`/offers/${offer.id}`} key={offer.id}>
              <a>
                <span className="sr-only">single offer</span>
                <article className={styles.offer}>
                  <div className={styles.main}>
                    <div className={styles.logo}>
                      <Avatar name={offer.company} />
                    </div>

                    <span className="sr-only">job title</span>
                    <span className={styles.offerTitle}>
                      {offer.title.length > 64
                        ? `${offer.title.slice(0, 64)}...`
                        : offer.title}
                    </span>

                    <span className="sr-only">company</span>
                    <span className={styles.company}>{offer.company}</span>

                    <span className="sr-only">location</span>
                    <span className={styles.location}>{offer.location}</span>
                  </div>

                  <div className={styles.additional}>
                    <span className="sr-only">salary</span>
                    <span className={styles.salary}>
                      ${addCommasToNumber(offer.salary)}
                    </span>
                    {offer.company_url ? (
                      <a
                        className={styles.btn}
                        href={offer.company_url}
                        onClick={(e) => e.stopPropagation()}
                        rel="noopener"
                      >
                        <span className="sr-only">link to company site</span>
                        <Forward className={styles.icon} />
                      </a>
                    ) : null}
                  </div>
                </article>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
});

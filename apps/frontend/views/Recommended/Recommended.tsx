import styles from "./Recommended.module.scss";
import Forward from "../../public/icons/buttons/forward.svg";
import Back from "../../public/icons/buttons/back.svg";
import { Avatar } from "../../components/Avatar/Avatar";
import { useState, useEffect, useCallback, memo, createRef } from "react";
import Link from "next/link";
import { useWindowSize } from "../../lib/hooks/useWindowSize";
import type { OfferWithSalary } from "@finejob/types";
import classnames from "classnames";

type RecommendedSectionProps = {
  readonly offers: OfferWithSalary[];
};

export const Recommended = memo<RecommendedSectionProps>(({ offers }) => {
  const { width } = useWindowSize();
  const [scroll, setScroll] = useState(0);
  const baseScrollValue = 450;
  const maxScroll = 290 * offers.length - (width! < 1400 ? width! + 280 : 1400); //element total width * elements - (screen width + element width || 1400)
  const offersContainerRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const handleResize = () => {
      setScroll(0);
    };
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
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Recommended Jobs</h2>

      {scroll !== 0 ? (
        <button
          className={classnames(styles.scrollLeft, styles.btn)}
          onClick={handleScrollLeft}
        >
          <Back className={styles.icon} />
        </button>
      ) : null}

      {scroll !== -maxScroll ? (
        <button
          className={classnames(styles.scrollRight, styles.btn)}
          onClick={handleScrollRight}
        >
          <Forward className={styles.icon} />
        </button>
      ) : null}

      <article
        className={styles.offers}
        style={{ transform: `translateX(${scroll}px)` }}
        ref={offersContainerRef}
      >
        {offers.map((offer) => (
          <Link href={`/offers/${offer.id}`} key={offer.id}>
            <a>
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
                    ${offer.salary.toFixed(0)}
                  </span>
                  {offer.company_url ? (
                    <Link href={offer.company_url}>
                      <button className={styles.btn}>
                        <Forward className={styles.icon} />
                      </button>
                    </Link>
                  ) : null}
                </div>
              </article>
            </a>
          </Link>
        ))}
      </article>
    </section>
  );
});

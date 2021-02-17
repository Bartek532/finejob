import * as React from "react";
import styles from "./Recommended.module.scss";
import Forward from "../../public/icons/buttons/forward.svg";
import Back from "../../public/icons/buttons/back-simple.svg";
import { Avatar } from "../../components/Avatar/Avatar";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useWindowSize } from "../../lib/hooks/useWindowSize";
import type { Offer } from "../../types";
import classnames from "classnames";

export const Recommended = ({ offers }: { offers: Offer[] }) => {
  const { width } = useWindowSize();
  const [scroll, setScroll] = useState(0);
  const baseScrollValue = 450;
  const maxScroll = 290 * offers.length - (width! < 1400 ? width! + 280 : 1400); //element total width * elements - (screen width + element width || 1400)
  const offersContainerRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    const handleResize = () => {
      setScroll(0);
    };
    window.addEventListener("resize", handleResize);
    () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScrollLeft = () => {
    const { x } = offersContainerRef.current?.getBoundingClientRect()!;
    if (x + baseScrollValue >= 0) {
      setScroll(0);
    } else {
      setScroll(scroll => scroll + baseScrollValue);
    }
  };

  const handleScrollRight = () => {
    const { x } = offersContainerRef.current?.getBoundingClientRect()!;
    if (x - baseScrollValue <= -maxScroll) {
      setScroll(-maxScroll);
    } else {
      setScroll(scroll => scroll - baseScrollValue);
    }
  };

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
        {offers.map(offer => (
          <article className={styles.offer} key={offer.id}>
            <div className={styles.main}>
              <div className={styles.logo}>
                <Avatar name={offer.company} />
              </div>

              <span className={styles.offerTitle}>
                {offer.title.length > 64
                  ? `${offer.title.slice(0, 64)}...`
                  : offer.title}
              </span>
              <span className={styles.company}>{offer.company}</span>
              <span className={styles.location}>{offer.location}</span>
            </div>

            <div className={styles.additional}>
              <span className={styles.salary}>${offer.salary.toFixed(0)}</span>
              <Link href={offer.company_url || ""}>
                <button className={styles.btn}>
                  <Forward className={styles.icon} />
                </button>
              </Link>
            </div>
          </article>
        ))}
      </article>
    </section>
  );
};

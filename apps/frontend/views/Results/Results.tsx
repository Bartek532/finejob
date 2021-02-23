import { OfferTile } from "../../components/OfferTile/OfferTile";
import styles from "./Results.module.scss";
import type { Offer } from "../../types";

export const Results = ({ offers }: { offers: Offer[] }) => {
  return (
    <section className={styles.offers}>
      {offers
        ? offers.map(offer => (
            <OfferTile
              title={offer.title}
              location={offer.location}
              company={offer.company}
              salary={offer.salary}
              company_url={offer.company_url}
              key={offer.id}
              id={offer.id}
            />
          ))
        : null}
    </section>
  );
};

import { OfferTile } from "../../components/OfferTile/OfferTile";
import styles from "./Results.module.scss";
import { useSelector } from "react-redux";
import { getAllOffers } from "../../store/offersSlice";

export const Results = () => {
  const offers = useSelector(getAllOffers);
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

import { OfferTile } from "../../components/OfferTile/OfferTile";
import { useSelector } from "react-redux";
import { getAllOffers } from "../../store/offersSlice";
import styles from "./SearchResults.module.scss";

export const SearchResults = () => {
  const offers = useSelector(getAllOffers);

  return (
    <section className={styles.offers}>
      {offers.map(offer => (
        <OfferTile
          title={offer.title}
          location={offer.location}
          company={offer.company}
          salary={offer.salary}
          company_url={offer.company_url}
          key={offer.id}
        />
      ))}
    </section>
  );
};

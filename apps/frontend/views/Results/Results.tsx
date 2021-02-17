import { SearchResults } from "../SearchResults/SearchResults";
import { Input } from "../../components/Input/Input";
import { ActionButton } from "../../components/ActionButton/ActionButton";
import { LoadMore } from "../../components/LoadMore/LoadMore";
import styles from "./Results.module.scss";
import { JobsAPI } from "../../lib/api/offers";
import { prepareQueryToSearch } from "../../lib/utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { getActualResultsPage, getAllOffers } from "../../store/offersSlice";
import { getLastQuery } from "../../store/mainSlice";
import { useForm } from "react-hook-form";

export const Results = () => {
  const dispatch = useDispatch();
  const resultsPage = useSelector(getActualResultsPage);
  const lastQuery = useSelector(getLastQuery);
  const allOffers = useSelector(getAllOffers);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { search: lastQuery },
  });

  const onSearch = ({ search: query }: { search: string }) => {
    if (query && query.trim().length) {
      reset();
      dispatch(JobsAPI.searchByQuery(prepareQueryToSearch(query)));
    }
  };

  return (
    <main className={styles.results}>
      <form className={styles.form} onSubmit={handleSubmit(onSearch)}>
        <Input
          name="search"
          type="search"
          inputRef={register}
          shouldBeFocused
        />
        <ActionButton icon="search" />
      </form>
      <SearchResults />
      {allOffers.length < 50 * resultsPage ? null : <LoadMore />}
    </main>
  );
};

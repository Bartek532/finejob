import { SearchResults } from "../SearchResults/SearchResults";
import { Input } from "../../components/Input/Input";
import { ActionButton } from "../../components/ActionButton/ActionButton";
import { LoadMore } from "../../components/LoadMore/LoadMore";
import { EmptyResults } from "../../components/EmptyResults/EmptyResults";
import styles from "./Results.module.scss";
import { JobsAPI } from "../../lib/api/offers";
import { prepareQueryToSearch } from "../../lib/utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { getActualResultsPage, getAllOffers } from "../../store/offersSlice";
import { getLastQuery } from "../../store/mainSlice";
import { useForm } from "react-hook-form";
import Link from "next/link";

export const Results = () => {
  const dispatch = useDispatch();
  const resultsPage = useSelector(getActualResultsPage);
  const lastQuery = useSelector(getLastQuery);
  const allOffers = useSelector(getAllOffers);
  const { register, handleSubmit, reset, setValue } = useForm();

  setValue("search", lastQuery);

  const onSearch = ({ search: query }: { search: string }) => {
    if (query && query.trim().length) {
      reset();
      dispatch(JobsAPI.searchByQuery(prepareQueryToSearch(query)));
    }
  };

  return (
    <main className={styles.results}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSearch)}
        id="search"
      >
        <Input
          name="search"
          type="search"
          inputRef={register}
          shouldBeFocused
        />
        <ActionButton icon="search" />
      </form>
      {allOffers.length ? <SearchResults /> : <EmptyResults />}
      {allOffers.length < 50 * resultsPage ? (
        <div className={styles.all}>
          <span className={styles.text}>It's all! &#128064;</span>
          <Link href="#search">
            <a className={styles.link}>Search again</a>
          </Link>
        </div>
      ) : (
        <LoadMore />
      )}
    </main>
  );
};

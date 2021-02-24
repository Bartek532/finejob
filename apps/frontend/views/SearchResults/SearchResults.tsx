import { Results } from "../Results/Results";
import { Input } from "../../components/Input/Input";
import { ActionButton } from "../../components/ActionButton/ActionButton";
import { LoadMore } from "../../components/LoadMore/LoadMore";
import { EmptyResults } from "../../components/EmptyResults/EmptyResults";
import styles from "./SearchResults.module.scss";
import { JobsAPI } from "../../lib/api/offers";
import { Modal } from "../../components/Modal/Modal";
import { prepareQueryToSearch } from "../../lib/utils/functions";
import { useDispatch, useSelector } from "react-redux";
import {
  getActualResultsPage,
  getAllOffers,
  setOffers,
} from "../../store/offersSlice";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect, memo } from "react";
import Link from "next/link";

export const SearchResults = memo(() => {
  const dispatch = useDispatch();
  const router = useRouter();
  const resultsPage = useSelector(getActualResultsPage);
  const allOffers = useSelector(getAllOffers);
  const { register, handleSubmit, reset, setValue } = useForm();

  setValue(
    "search",
    decodeURIComponent(
      (router.query.q as string) || (router.query.location as string) || ""
    )
  );

  useEffect(() => {
    dispatch(setOffers([]));
    dispatch(JobsAPI.searchOffers(router.asPath.slice(8)));
  }, [router.asPath]);

  const onSearch = ({ search: query }: { search: string }) => {
    if (query && query.trim().length) {
      reset();
      router.replace({
        pathname: "/offers",
        query: { q: prepareQueryToSearch(query) },
      });
    }
  };

  return (
    <>
      <Modal />
      <main className={styles.results}>
        <form className={styles.form} onSubmit={handleSubmit(onSearch)}>
          <Input
            name="search"
            type="search"
            inputRef={register}
            shouldBeFocused
          />
          <ActionButton icon="search" type="submit" />
        </form>
        {allOffers.length ? <Results /> : <EmptyResults />}
        {allOffers.length < 50 * resultsPage && allOffers.length ? (
          <div className={styles.all}>
            <span className={styles.text}>It's all! &#128064;</span>
            <Link href="/search">
              <a className={styles.link}>Search again</a>
            </Link>
          </div>
        ) : allOffers.length ? (
          <LoadMore />
        ) : null}
      </main>
    </>
  );
});

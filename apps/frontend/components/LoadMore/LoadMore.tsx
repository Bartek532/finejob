import { memo } from "react";
import { MainButton } from "../MainButton/MainButton";
import { useSelector, useDispatch } from "react-redux";
import { JobsAPI } from "../../lib/api/offers";
import { getLoadMoreStatus } from "../../store/offersSlice";
import styles from "./LoadMore.module.scss";

export const LoadMore = memo(() => {
  const loadMoreStatus = useSelector(getLoadMoreStatus);
  const dispatch = useDispatch();

  const handleLoadMore = () => {
    dispatch(JobsAPI.loadMore());
  };

  return (
    <div className={styles.loadMore}>
      {loadMoreStatus ? (
        <div className={styles.spinner}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <MainButton text="Load more" onClick={handleLoadMore} />
      )}
    </div>
  );
});

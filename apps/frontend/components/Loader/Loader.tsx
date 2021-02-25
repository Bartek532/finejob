import Image from "next/image";
import styles from "./Loader.module.scss";
import { getLoadingStatus } from "../../store/mainSlice";
import { useSelector } from "react-redux";
import { memo } from "react";

export const Loader = memo(() => {
  const loading = useSelector(getLoadingStatus);

  if (!loading) {
    return null;
  }

  return (
    <div className={styles.loader}>
      <Image
        src="/icons/full-logo.svg"
        width={235}
        height={68}
        alt="Loading..."
      />
    </div>
  );
});

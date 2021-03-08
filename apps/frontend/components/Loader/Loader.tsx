import styles from "./Loader.module.scss";
import { getLoadingStatus } from "../../store/mainSlice";
import { useSelector } from "react-redux";
import { memo } from "react";
import { Logo } from "../Logo/Logo";

export const Loader = memo(() => {
  const loading = useSelector(getLoadingStatus);

  if (!loading) {
    return null;
  }

  return (
    <div className={styles.loader}>
      <div className={styles.logo}>
        <Logo withLabel />
      </div>
    </div>
  );
});

/*
<Image
        src="/icons/full-logo.svg"
        width={235}
        height={68}
        alt="Loading..."
      />*/

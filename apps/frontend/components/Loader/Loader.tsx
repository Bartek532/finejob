import styles from "./Loader.module.scss";
import { getLoadingStatus } from "../../store/mainSlice";
import { useSelector } from "react-redux";
import { Logo } from "../Logo/Logo";

export const Loader = () => {
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
};

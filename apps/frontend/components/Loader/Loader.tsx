import Image from "next/image";
import styles from "./Loader.module.scss";
import { getLoading } from "../../store/mainSlice";
import { useSelector } from "react-redux";

export const Loader = () => {
  const loading = useSelector(getLoading);

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
};

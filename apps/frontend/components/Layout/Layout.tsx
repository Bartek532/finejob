import { Navbar } from "../Navbar/Navbar";
import { Modal } from "../Modal/Modal";
import { Loader } from "../Loader/Loader";
import styles from "./Layout.module.scss";
import FullLogo from "../../public/icons/full-logo.svg";
import { useWindowSize } from "../../lib/hooks/useWindowSize";
import Link from "next/link";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { width } = useWindowSize();
  return (
    <div className={styles.content}>
      <Modal />
      <Loader />
      <Navbar />
      {width! > 1000 ? (
        <Link href="/">
          <a className={styles.logo}>
            <FullLogo />
          </a>
        </Link>
      ) : null}
      {children}
    </div>
  );
};

import { Navbar } from "../Navbar/Navbar";
import { Loader } from "../Loader/Loader";
import { CookiesPopup } from "../CookiesPopup/CookiesPopup";
import styles from "./Layout.module.scss";
import FullLogo from "../../public/icons/full-logo.svg";
import { useWindowSize } from "../../lib/hooks/useWindowSize";
import Link from "next/link";

export const Layout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) => {
  const { width } = useWindowSize();
  return (
    <div className={styles.content}>
      <Loader />
      <Navbar />
      {width! > 1000 ? (
        <Link href="/">
          <a className={styles.logo}>
            <FullLogo />
          </a>
        </Link>
      ) : null}
      {title ? <h1 className={styles.title}>{title}</h1> : null}
      {children}

      <CookiesPopup />
    </div>
  );
};

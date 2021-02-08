import { Navbar } from "../Navbar/Navbar";
import styles from "./Layout.module.scss";
import FullLogo from "../../public/icons/full-logo.svg";
import { useWindowSize } from "../../lib/hooks/useWindowSize";
import Link from "next/link";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { width } = useWindowSize();
  return (
    <div className={styles.content}>
      {width! > 1000 ? (
        <Link href="/">
          <a className={styles.logo}>
            <FullLogo />
          </a>
        </Link>
      ) : null}
      {children}
      <Navbar />
    </div>
  );
};

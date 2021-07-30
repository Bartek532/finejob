import Link from "next/link";
import Search from "../../public/icons/nav/search.svg";
import About from "../../public/icons/nav/about.svg";
import Location from "../../public/icons/nav/location.svg";
import Person from "../../public/icons/nav/person.svg";
import Image from "next/image";
import { useWindowSize } from "../../lib/hooks/useWindowSize";
import styles from "./Navbar.module.scss";
import classnames from "classnames";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getLoginStatus } from "../../store/mainSlice";

export const Navbar = () => {
  const { pathname } = useRouter();
  const { width } = useWindowSize();
  const isLogin = useSelector(getLoginStatus);
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.left}>
          <ul className={styles.links}>
            <li className={styles.listItem}>
              <Link href="/about">
                <a
                  className={classnames(
                    { [styles.active]: pathname === "/about" },
                    styles.link,
                  )}
                >
                  <About />
                  <span className={styles.label}>About</span>
                </a>
              </Link>
            </li>
            <li className={styles.listItem}>
              <Link href="/search">
                <a
                  className={classnames(
                    {
                      [styles.active]: pathname === "/search",
                    },
                    styles.link,
                  )}
                >
                  <Search />
                  <span className={styles.label}>Search</span>
                </a>
              </Link>
            </li>
          </ul>
        </li>
        <li className={styles.listItem}>
          <Link href="/">
            <div className={styles.center}>
              <span className="sr-only">home</span>
              <Image src="/icons/logo.svg" width={22} height={22} alt="logo" />
            </div>
          </Link>
        </li>
        <li className={styles.right}>
          <ul className={styles.links}>
            <li className={styles.listItem}>
              <Link href="/search/location">
                <a
                  className={classnames(
                    {
                      [styles.active]: pathname === "/search/location",
                    },
                    styles.link,
                  )}
                >
                  <Location />
                  <span className={styles.label}>
                    {width! > 1000 ? "Search by location" : "Geosearch"}
                  </span>
                </a>
              </Link>
            </li>
            <li className={styles.listItem}>
              <Link href="/auth/login">
                <a
                  className={classnames(
                    {
                      [styles.active]:
                        pathname === "/auth/login" ||
                        pathname.startsWith("/dashboard"),
                    },
                    styles.link,
                  )}
                >
                  <Person />
                  <span className={styles.label}>
                    {isLogin ? "Account" : "Sign in"}
                  </span>
                </a>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

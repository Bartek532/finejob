import Link from "next/link";
import Search from "../../public/icons/nav/search.svg";
import About from "../../public/icons/nav/about.svg";
import Location from "../../public/icons/nav/location.svg";
import Person from "../../public/icons/nav/person.svg";
import Logo from "../../public/icons/logo.svg";

import styles from "./Navbar.module.scss";
import classnames from "classnames";
import { useRouter } from "next/router";

export const Navbar = () => {
  const { pathname } = useRouter();
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Link href="/about">
          <a className={classnames({ [styles.active]: pathname === "/about" })}>
            <About />
            <span className={styles.label}>About</span>
          </a>
        </Link>
        <Link href="/search/main">
          <a
            className={classnames({
              [styles.active]: pathname === "/search/main",
            })}
          >
            <Search />
            <span className={styles.label}>Search</span>
          </a>
        </Link>
      </div>
      <Link href="/">
        <div className={styles.center}>
          <Logo />
        </div>
      </Link>
      <div className={styles.right}>
        <Link href="/search/location">
          <a
            className={classnames({
              [styles.active]: pathname === "/search/location",
            })}
          >
            <Location />
            <span className={styles.label}>Search by location</span>
          </a>
        </Link>
        <Link href="/auth/login">
          <a
            className={classnames({
              [styles.active]: pathname === "/auth/login",
            })}
          >
            <Person />
            <span className={styles.label}>sign in</span>
          </a>
        </Link>
      </div>
    </nav>
  );
};

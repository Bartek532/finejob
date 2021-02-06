import Link from "next/link";
import Search from "../../assets/icons/nav/search.svg";
import About from "../../assets/icons/nav/about.svg";
import Location from "../../assets/icons/nav/location.svg";
import Person from "../../assets/icons/nav/person.svg";
import Logo from "../../assets/icons/logo.svg";

import styles from "./Navbar.module.scss";
import classnames from "classnames";
import { useRouter } from "next/router";

export const Navbar = () => {
  const { pathname } = useRouter();
  return (
    <nav className={styles.nav}>
      <section className={styles.left}>
        <Link href="/about" as="/about">
          <div
            className={classnames({ [styles.active]: pathname === "/about" })}
          >
            <About />
          </div>
        </Link>
        <Link href="/search/main">
          <div
            className={classnames({
              [styles.active]: pathname === "/search/main",
            })}
          >
            <Search />
          </div>
        </Link>
      </section>
      <Link href="/">
        <div className={styles.center}>
          <Logo />
        </div>
      </Link>
      <section className={styles.right}>
        <Link href="/search/location">
          <div
            className={classnames({
              [styles.active]: pathname === "/search/location",
            })}
          >
            <Location />
          </div>
        </Link>
        <Link href="/auth/login">
          <div
            className={classnames({
              [styles.active]: pathname === "/auth/login",
            })}
          >
            <Person />
          </div>
        </Link>
      </section>
    </nav>
  );
};

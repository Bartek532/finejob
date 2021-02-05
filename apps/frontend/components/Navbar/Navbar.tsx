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
        <Link href="/about">
          <About
            className={classnames({ [styles.active]: pathname === "/about" })}
          />
        </Link>
        <Link href="/search/main">
          <Search
            className={classnames({
              [styles.active]: pathname === "/search/main",
            })}
          />
        </Link>
      </section>
      <Link href="/">
        <div className={styles.center}>
          <Logo />
        </div>
      </Link>
      <section className={styles.right}>
        <Link href="/search/location">
          <Location
            className={classnames({
              [styles.active]: pathname === "/search/location",
            })}
          />
        </Link>
        <Link href="/auth/login">
          <Person
            className={classnames({
              [styles.active]: pathname === "/auth/login",
            })}
          />
        </Link>
      </section>
    </nav>
  );
};

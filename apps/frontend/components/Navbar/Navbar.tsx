import Link from "next/link";
import Search from "../../assets/icons/nav/search.svg";
import About from "../../assets/icons/nav/about.svg";
import Location from "../../assets/icons/nav/location.svg";
import Person from "../../assets/icons/nav/person.svg";
import Logo from "../../assets/icons/logo.svg";

import styles from "./Navbar.module.scss";

export const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <section className={styles.left}>
        <Link href="/about">
          <About />
        </Link>
        <Link href="/search/main">
          <Search />
        </Link>
      </section>
      <Link href="/">
        <div className={styles.center}>
          <Logo />
        </div>
      </Link>
      <section className={styles.right}>
        <Link href="/search/location">
          <Location />
        </Link>
        <Link href="/auth/login">
          <Person />
        </Link>
      </section>
    </nav>
  );
};

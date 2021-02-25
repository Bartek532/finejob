import Link from "next/link";
import Search from "../../public/icons/nav/search.svg";
import About from "../../public/icons/nav/about.svg";
import Location from "../../public/icons/nav/location.svg";
import Person from "../../public/icons/nav/person.svg";
import Image from "next/image";
import { memo } from "react";

import styles from "./Navbar.module.scss";
import classnames from "classnames";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getLoginStatus } from "../../store/mainSlice";

export const Navbar = memo(() => {
  const { pathname } = useRouter();
  const isLogin = useSelector(getLoginStatus);
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Link href="/about">
          <a className={classnames({ [styles.active]: pathname === "/about" })}>
            <About />
            <span className={styles.label}>About</span>
          </a>
        </Link>
        <Link href="/search">
          <a
            className={classnames({
              [styles.active]: pathname === "/search",
            })}
          >
            <Search />
            <span className={styles.label}>Search</span>
          </a>
        </Link>
      </div>
      <Link href="/">
        <div className={styles.center}>
          <Image src="/icons/logo.svg" width={22} height={22} alt="logo" />
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
              [styles.active]:
                pathname === "/auth/login" || pathname.startsWith("/dashboard"),
            })}
          >
            <Person />
            <span className={styles.label}>
              {isLogin ? "account" : "sign in"}
            </span>
          </a>
        </Link>
      </div>
    </nav>
  );
});

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
            <span className="sr-only">about</span>
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
            <span className="sr-only">search</span>
            <Search />
            <span className={styles.label}>Search</span>
          </a>
        </Link>
      </div>
      <Link href="/">
        <div className={styles.center}>
          <span className="sr-only">home</span>
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
            <span className="sr-only">search by location</span>
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
            <span className="sr-only">sign in</span>
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

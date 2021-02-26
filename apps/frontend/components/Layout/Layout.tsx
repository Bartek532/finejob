import { memo } from "react";
import { Navbar } from "../Navbar/Navbar";
import { Loader } from "../Loader/Loader";
import { CookiesPopup } from "../CookiesPopup/CookiesPopup";
import styles from "./Layout.module.scss";
import { NextSeo } from "next-seo";

import { titleTemplate as defaultTitleTemplate } from "../../pages/_app";

import FullLogo from "../../public/icons/full-logo.svg";
import { useWindowSize } from "../../lib/hooks/useWindowSize";
import Link from "next/link";

type LayoutProps = {
  readonly children: React.ReactNode;
  readonly title?: string;
  readonly titleTemplate?: string;
  readonly headerTitle?: string;
};

export const Layout = memo<LayoutProps>(
  ({ children, title, headerTitle, titleTemplate = defaultTitleTemplate }) => {
    const { width } = useWindowSize();
    return (
      <div className={styles.content}>
        <Loader />
        <header>
          {headerTitle ? <h1 className={styles.title}>{headerTitle}</h1> : null}
          <Navbar />
          {width! > 1000 ? (
            <Link href="/">
              <a className={styles.logo}>
                <FullLogo />
              </a>
            </Link>
          ) : null}
        </header>
        <CookiesPopup />
        {children}
        <NextSeo
          title={
            title ? titleTemplate.replace("%s", title) : titleTemplate.slice(4)
          }
          openGraph={{
            title: title
              ? titleTemplate.replace("%s", title)
              : titleTemplate.slice(4),
          }}
        />
      </div>
    );
  },
);

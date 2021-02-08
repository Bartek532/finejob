import { Input } from "../Input/Input";
import { MainButton } from "../MainButton/MainButton";
import styles from "./MainSection.module.scss";
import Image from "next/image";
import FullLogo from "../../public/icons/full-logo.svg";
import { useWindowSize } from "../../lib/hooks/useWindowSize";
import Link from "next/link";

export const MainSection = () => {
  const { width } = useWindowSize();
  return (
    <section className={styles.main}>
      {width! < 1000 ? (
        <Link href="/">
          <a className={styles.logo}>
            <FullLogo />
          </a>
        </Link>
      ) : null}
      <article className={styles.wrapper}>
        <h1 className={styles.title}>
          Your <span className={styles.violet}>next job</span> is here.
        </h1>
        <form className={styles.form}>
          <Input name="search" type="search" />
          <MainButton icon="search" />
        </form>
        <div className={styles.subtitle}>
          In last week we helps 1,500 job seekers and employees find the right
          job.
        </div>
      </article>
      <article className={styles.image}>
        <Image src="/images/career.svg" width={450} height={350} />
      </article>
    </section>
  );
};

import { Input } from "../Input/Input";
import { MainButton } from "../MainButton/MainButton";
import styles from "./MainSection.module.scss";
import Image from "next/image";

export const MainSection = () => {
  return (
    <section className={styles.main}>
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
      <Image src="/images/career.svg" width={450} height={350} />
    </section>
  );
};

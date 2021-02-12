import { Input } from "../Input/Input";
import { MainButton } from "../MainButton/MainButton";
import styles from "./SearchSection.module.scss";
import Image from "next/image";

import { useForm } from "react-hook-form";

export const MainSearch = () => {
  const { handleSubmit, register, reset } = useForm();

  const onSearch = () => {
    reset();
  };

  return (
    <section className={styles.main}>
      <article className={styles.wrapper}>
        <h1 className={styles.title}>
          <span className={styles.violet}>Search.</span> It's so simple.
        </h1>
        <form className={styles.form} onSubmit={handleSubmit(onSearch)}>
          <Input name="search" type="search" inputRef={register} />
          <MainButton icon="search" />
        </form>
        <div className={styles.subtitle}>
          Enter the keyword you are interested in and we will do the rest.
        </div>
      </article>
      <article className={styles.image}>
        <Image
          src="/images/search.svg"
          width={450}
          height={350}
          loading="lazy"
          alt=""
        />
      </article>
    </section>
  );
};

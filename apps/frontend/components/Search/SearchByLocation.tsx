import { Input } from "../Input/Input";
import { MainButton } from "../MainButton/MainButton";
import styles from "./SearchSection.module.scss";
import Image from "next/image";

import { useForm } from "react-hook-form";

export const SearchByLocation = () => {
  const { handleSubmit, register, reset } = useForm();

  const onSearch = () => {
    reset();
  };

  return (
    <section className={styles.main}>
      <article className={styles.wrapper}>
        <h1 className={styles.title}>
          Your <span className={styles.violet}>location</span> - your jobs.
        </h1>
        <form className={styles.form} onSubmit={handleSubmit(onSearch)}>
          <Input
            name="search"
            type="search"
            placeholder="Enter your city"
            inputRef={register}
          />
          <div className={styles.buttons}>
            <MainButton icon="location" />
            <MainButton icon="search" />
          </div>
        </form>
        <div className={styles.subtitle}>
          You can use this feature to make it easier to find a job near you.
        </div>
      </article>
      <article className={styles.image}>
        <Image
          src="/images/map.svg"
          width={450}
          height={350}
          loading="lazy"
          alt=""
        />
      </article>
    </section>
  );
};

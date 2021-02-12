import { Input } from "../Input/Input";
import { MainButton } from "../MainButton/MainButton";
import { JobsAPI } from "../../lib/api/offers";
import { useDispatch } from "react-redux";
import styles from "./SearchSection.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";

export const SearchByLocation = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm();

  const onSearch = ({ location: query }: { location: string }) => {
    if (query && query.trim().length) {
      reset();
      dispatch(JobsAPI.searchByLocation(query));
      router.push("/offers");
    }
  };

  return (
    <section className={styles.main}>
      <article className={styles.wrapper}>
        <h1 className={styles.title}>
          Your <span className={styles.violet}>location</span> - your jobs.
        </h1>
        <form className={styles.form} onSubmit={handleSubmit(onSearch)}>
          <Input
            name="location"
            type="search"
            placeholder="Enter your city"
            inputRef={register}
          />
          <div className={styles.buttons}>
            <MainButton icon="location" />
            <MainButton icon="search" type="submit" />
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

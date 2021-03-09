import { Input } from "../../components/Input/Input";
import { MainButton } from "../../components/MainButton/MainButton";
import styles from "./SearchSection.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { prepareQueryToSearch } from "../../lib/utils/functions";
import { useForm } from "react-hook-form";

export const MainSearch = () => {
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm();

  const onSearch = ({ search: query }: { search: string }) => {
    if (query && query.trim().length) {
      reset();
      router.push({
        pathname: "/offers",
        query: { q: prepareQueryToSearch(query) },
      });
    }
  };

  return (
    <section className={styles.main}>
      <article className={styles.wrapper}>
        <h1 className={styles.title}>
          <span className={styles.violet}>Search.</span> It's so simple.
        </h1>
        <form className={styles.form} onSubmit={handleSubmit(onSearch)}>
          <Input name="search" type="search" inputRef={register} />
          <MainButton icon="search" type="submit" />
        </form>
        <div className={styles.subtitle}>
          Enter the keyword you are interested in and we will do the rest.
        </div>
      </article>
      <div className={styles.image}>
        <Image
          src="/images/search.svg"
          width={450}
          height={350}
          loading="lazy"
          alt=""
        />
      </div>
    </section>
  );
};

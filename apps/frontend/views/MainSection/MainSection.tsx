import { memo } from "react";
import { Input } from "../../components/Input/Input";
import { MainButton } from "../../components/MainButton/MainButton";
import styles from "./MainSection.module.scss";
import Image from "next/image";
import FullLogo from "../../public/icons/full-logo.svg";
import { useWindowSize } from "../../lib/hooks/useWindowSize";
import { prepareQueryToSearch } from "../../lib/utils/functions";
import { ThemeSwitch } from "../../components/ThemeSwitch/ThemeSwitch";

import Link from "next/link";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";

export const MainSection = memo(() => {
  const { width } = useWindowSize();
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
      {width! < 1000 ? (
        <>
          <Link href="/">
            <a className={styles.logo}>
              <FullLogo />
            </a>
          </Link>
          <div className={styles.theme}>
            <ThemeSwitch />
          </div>
        </>
      ) : null}
      <article className={styles.wrapper}>
        <h1 className={styles.title}>
          Your <span className={styles.violet}>next job</span> is here.
        </h1>
        <form className={styles.form} onSubmit={handleSubmit(onSearch)}>
          <Input name="search" type="search" inputRef={register} />
          <MainButton icon="search" type="submit" />
        </form>
        <div className={styles.subtitle}>
          In last week we helps 1,500 job seekers and employees find the right
          job.
        </div>
      </article>
      <article className={styles.image}>
        <Image
          src="/images/career.svg"
          width={450}
          height={350}
          loading="lazy"
          alt=""
        />
      </article>
    </section>
  );
});

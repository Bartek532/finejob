import { Input } from "../../components/Input/Input";
import { MainButton } from "../../components/MainButton/MainButton";
import styles from "./MainSection.module.scss";
import Image from "next/image";
import FullLogo from "../../public/icons/full-logo.svg";
import { useWindowSize } from "../../lib/hooks/useWindowSize";
import { JobsAPI } from "../../lib/api/offers";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";

export const MainSection = () => {
  const { width } = useWindowSize();

  const dispatch = useDispatch();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm();

  const onSearch = ({ search: query }: { search: string }) => {
    if (query && query.trim().length) {
      reset();
      dispatch(JobsAPI.searchByQuery(query));
      router.push("/offers");
    }
  };

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
};

import styles from "./Recommended.module.scss";
import Forward from "../../public/icons/buttons/forward.svg";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { fetcher } from "../../lib/utils/fetcher";

export const Recommended = ({
  offers,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(offers);
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Recommended Jobs</h2>
      <div className={styles.offers}>
        <article className={styles.offer}>
          <div className={styles.main}>
            <div className={styles.logo}>BS</div>
            <span className={styles.offerTitle}>JavaScript Developer</span>
            <span className={styles.company}>Best company in the world</span>
            <span className={styles.location}>New York, America</span>
          </div>

          <div className={styles.additional}>
            <span className={styles.salary}>$12000</span>
            <button className={styles.btn}>
              <Forward className={styles.icon} />
            </button>
          </div>
        </article>
      </div>
    </section>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const offers = await fetcher("/api/offers/recommended", "GET");

  console.log("XD");

  if (!offers) {
    return {
      notFound: true,
    };
  }

  return { props: { offers } };
};

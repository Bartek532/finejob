import styles from "./Recommended.module.scss";
import Forward from "../../public/icons/buttons/forward.svg";

export const Recommended = () => {
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

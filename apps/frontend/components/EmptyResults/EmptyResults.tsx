import { memo } from "react";
import styles from "./EmptyResults.module.scss";
import Image from "next/image";

export const EmptyResults = memo(() => {
  return (
    <section className={styles.empty}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Sad no result!</h2>
        <p className={styles.description}>
          We cannot find the jobs you are searching for, maybe a little spelling
          mistake?
        </p>
      </div>
      <div className={styles.image}>
        <Image src="/images/empty.gif" width={400} height={400} alt="empty" />
      </div>
    </section>
  );
});

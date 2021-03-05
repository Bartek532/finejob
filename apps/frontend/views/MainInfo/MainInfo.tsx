import { memo } from "react";
import { Counter } from "../../components/Counter/Counter";
import styles from "./MainInfo.module.scss";
import Image from "next/image";

const jobsInfo = [
  { label: "Live jobs", value: 12000, icon: "live" },
  { label: "Page views", value: "5000000+", icon: "eye" },
  { label: "Daily job post", value: "5000+", icon: "calendar" },
  { label: "Saved jobs", value: 6400, icon: "save" },
];

export const MainInfo = memo(() => {
  return (
    <section className={styles.wrapper}>
      <article className={styles.mainCounter}>
        <h2 className={styles.title}>
          So many employees found a job thanks to us:
        </h2>
        <Counter value={12000000} time={7} />
      </article>
      <article className={styles.jobs}>
        {jobsInfo.map((item) => (
          <div className={styles.data} key={item.label}>
            <div className={styles.text}>
              <span className={styles.label}>{item.label}</span>
              <span className={styles.value}>{item.value}</span>
            </div>
            <div className={styles.icon}>
              <Image
                width={37}
                height={37}
                src={`/icons/main/${item.icon}.svg`}
                alt=""
              />
            </div>
          </div>
        ))}
      </article>

      <article className={styles.mobileApp}>
        <div className={styles.mockup}>
          <Image
            src="/images/mockups/mobile-app.png"
            alt="mockup"
            width={460}
            height={525}
          />
        </div>
        <div className={styles.about}>
          <h3 className={styles.title}>Our mobile app</h3>
          <p className={styles.text}>
            We are now working on our mobile application, we are testing new
            solutions to make job search even easier. Imagine that you will be
            able to search from everywhere! On the train, on the bus, even in
            the toilet &#40;&#128513;&#41; Finejob will help you find your dream
            job. If you have any questions or suggestion give us a feedback.
            This will help us to improve our application to be the best
            possible.
            <strong className={styles.motto}>
              From users to users &#128521;{" "}
            </strong>
            App will be available in the App Store and Google Play soon.
          </p>
          <button className={styles.btn}>Check</button>
        </div>
      </article>
    </section>
  );
});

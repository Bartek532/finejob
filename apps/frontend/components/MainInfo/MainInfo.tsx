import { Counter } from "../Counter/Counter";
import styles from "./MainInfo.module.scss";
import Image from "next/image";

const jobs = [
  { label: "Live jobs", value: 12000, icon: "live" },
  { label: "Page views", value: "5000000+", icon: "eye" },
  { label: "Daily job post", value: "5000+", icon: "calendar" },
  { label: "Saved jobs", value: 6400, icon: "save" },
];

export const MainInfo = () => {
  return (
    <section className={styles.wrapper}>
      <article className={styles.mainCounter}>
        <h2 className={styles.title}>
          So many employees found a job thanks to us:
        </h2>
        <Counter value={12000000} time={7} />
      </article>
      <article className={styles.jobs}>
        {jobs.map(item => (
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
            src="/images/first_mockup.png"
            alt="mockup"
            width={460}
            height={525}
          />
        </div>
        <div className={styles.about}>
          <h3 className={styles.title}>Our mobile app</h3>
          <p className={styles.text}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            vitae animi deleniti saepe et quos! Nihil illum perferendis fugit
            fugiat, blanditiis accusamus minus libero unde aliquam
            exercitationem fuga temporibus dolor. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Voluptatibus accusantium facilis illo
            maiores debitis, placeat explicabo nisi, necessitatibus fugit
            quaerat optio unde deleniti quasi ipsum! Id culpa eveniet corrupti
            dolor.
          </p>
          <button className={styles.btn}>Check</button>
        </div>
      </article>
    </section>
  );
};

import styles from "./AboutSection.module.scss";
import { Counter } from "../../components/Counter/Counter";
import Image from "next/image";
import { steps } from "./data";

export const AboutSection = () => {
  return (
    <main className={styles.about}>
      <section className={styles.steps}>
        {steps.map((step) => (
          <article className={styles.step} key={step.title}>
            <div className={styles.description}>
              <h2 className={styles.title}>{step.title}</h2>
              <p
                className={styles.text}
                dangerouslySetInnerHTML={{ __html: step.description }}
              ></p>
            </div>
            <div className={styles.image}>
              <Image
                src={`/images/mockups/${step.image}.png`}
                alt={step.image}
                width={320}
                height={220}
              />
            </div>
          </article>
        ))}
      </section>

      <div className={styles.employeeCounter}>
        <h2 className={styles.label}>
          <strong className={styles.strong}>Congrats!</strong> You've joined
        </h2>
        <Counter value={2700000} time={5} />
        <h3 className={styles.subtitle}>
          other employees who found a job through our app!
        </h3>
      </div>
    </main>
  );
};

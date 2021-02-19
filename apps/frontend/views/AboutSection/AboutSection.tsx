import styles from "./AboutSection.module.scss";

const steps = [
  {
    title: "Search",
    image: "search",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, optio velit voluptatum nihil necessitatibus obcaecati aliquam tempore ipsam, deserunt a numquam qui porro dolores fugiat soluta libero eius exercitationem quis.",
  },
  {
    title: "Choose",
    image: "choose",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, optio velit voluptatum nihil necessitatibus obcaecati aliquam tempore ipsam, deserunt a numquam qui porro dolores fugiat soluta libero eius exercitationem quis.",
  },
  {
    title: "Save",
    image: "save",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, optio velit voluptatum nihil necessitatibus obcaecati aliquam tempore ipsam, deserunt a numquam qui porro dolores fugiat soluta libero eius exercitationem quis.",
  },
  {
    title: "Read more",
    image: "read",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, optio velit voluptatum nihil necessitatibus obcaecati aliquam tempore ipsam, deserunt a numquam qui porro dolores fugiat soluta libero eius exercitationem quis.",
  },
  {
    title: "Apply",
    image: "apply",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, optio velit voluptatum nihil necessitatibus obcaecati aliquam tempore ipsam, deserunt a numquam qui porro dolores fugiat soluta libero eius exercitationem quis.",
  },
];

export const AboutSection = () => {
  return (
    <section className={styles.about}>
      <h1 className={styles.title}>how it works</h1>
      <div className={styles.steps}>
        {steps.map(step => (
          <article className={styles.step}>
            <div className={styles.description}>
              <h3>{step.title}</h3>
              <p className={styles.text}>{step.description}</p>
            </div>
            <div className={styles.image}></div>
          </article>
        ))}
      </div>
    </section>
  );
};

import styles from "./AboutSection.module.scss";
import Image from "next/image";

const steps = [
  {
    title: "Search",
    image: "search",
    description:
      "Finejob provides you a couple of ways to search. You can search <b>by keyword</b>, <b>by location</b> and many more. Imagine, you can find a job that is near you! We search thousands of offers, use the latest technologies to find what you are looking for!",
  },
  {
    title: "Choose",
    image: "choose",
    description:
      "After you tell us what you are looking for we listing you dozens of offers. But don't worry! First, you will see only first <b>50</b> offers, so you can carefully and efficiently choose. But if you can't find anything for yourself, load more offers! We will inform you when the offers end and you have to search again. <b>Don't give up!</b>",
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
          <article className={styles.step} key={step.title}>
            <div className={styles.description}>
              <h3>{step.title}</h3>
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
      </div>
    </section>
  );
};

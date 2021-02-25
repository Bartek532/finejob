import { memo } from "react";
import styles from "./AboutSection.module.scss";
import { Counter } from "../../components/Counter/Counter";
import Image from "next/image";

const steps = [
  {
    title: "Search",
    image: "search",
    description:
      "Finejob provides you a couple of ways to search. You can search <strong>by keyword</strong>, <strong>by location</strong> and many more. Imagine, you can find a job that is near you! We search thousands of offers, use the latest technologies to find what you are looking for!",
  },
  {
    title: "Choose",
    image: "choose",
    description:
      "After you tell us what you are looking for we listing you dozens of offers. But don't worry! First, you will see only first <strong>50</strong> offers, so you can carefully and efficiently choose. But if you can't find anything for yourself, load more offers! We will inform you when the offers end and you have to search again. <strong>Don't give up!</strong>",
  },
  {
    title: "Save",
    image: "save",
    description:
      "If you dont't have enough time to get to know the offer you can <strong>save it</strong>. After all you can come back and find saved offers in your <strong>dashboard</strong> in <em>saved</em> section. Don't be afraid and save as many offers as you want. ",
  },
  {
    title: "Read more",
    image: "read",
    description:
      "Each offer includes a <strong>description</strong> that was provided by the company that added offer. Information contained there will help you understand what they require of you. Compare your skills with the given stack and <strong>apply!<b/>",
  },
  {
    title: "Apply",
    image: "apply",
    description:
      "<strong>Last step!</strong> You find your dream job, <strong>congrats!</strong> Now you have to apply. Each offer contains <em>how to apply</em> section which is located after description. There you will find all the links and information you need. <strong>Good luck!</strong>",
  },
];

export const AboutSection = memo(() => {
  return (
    <main className={styles.about}>
      <div className={styles.steps}>
        {steps.map((step) => (
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

      <article className={styles.employeeCounter}>
        <h2 className={styles.label}>
          <strong>Congrats!</strong> You've joined
        </h2>
        <Counter value={2700000} time={5} />
        <h3 className={styles.subtitle}>
          other employees who found a job through our app!
        </h3>
      </article>
    </main>
  );
});

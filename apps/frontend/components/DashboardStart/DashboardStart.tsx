import styles from "./DashboardStart.module.scss";
import Image from "next/image";
const fields = [
  { label: "saved", icon: "saved" },
  { label: "settings", icon: "settings" },
];

export const DashboardStart = () => {
  return (
    <section className={styles.fields}>
      {fields.map(field => (
        <article className={styles.field} key={field.icon}>
          <div className={styles.icon}>
            <Image
              src={`/images/dashboard/${field.icon}.svg`}
              alt={field.label}
              width={115}
              height={115}
              loading="lazy"
            />
          </div>
          <span className={styles.label}>{field.label}</span>
        </article>
      ))}
    </section>
  );
};

import styles from "./DashboardStart.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
const fields = [
  { label: "saved", icon: "saved" },
  { label: "settings", icon: "settings" },
];

export const DashboardStart = () => {
  const router = useRouter();
  return (
    <section className={styles.fields}>
      {fields.map(field => (
        <article
          className={styles.field}
          key={field.icon}
          onClick={() => router.push(`/dashboard/${field.label}`)}
        >
          <div className={styles.icon}>
            <Image
              src={`/images/dashboard/${field.icon}.svg`}
              alt={field.label}
              width={115}
              height={115}
              loading="lazy"
            />
          </div>
          <button className={styles.label}>{field.label}</button>
        </article>
      ))}
    </section>
  );
};

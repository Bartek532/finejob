import { memo } from "react";
import styles from "./DashboardStart.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { UserAPI } from "../../lib/api/user";
import { MainButton } from "../../components/MainButton/MainButton";

const fields = [
  { label: "saved", icon: "saved" },
  { label: "settings", icon: "settings" },
];

export const DashboardStart = memo(() => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = () => {
    router.push("/auth/login");
    dispatch(UserAPI.logout());
  };
  return (
    <main className={styles.dashboard}>
      <section className={styles.fields}>
        {fields.map((field) => (
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
      <MainButton text="Logout" onClick={handleLogout} />
    </main>
  );
});
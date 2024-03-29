import styles from "./DashboardStart.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { UserAPI } from "../../lib/api/user";
import { MainButton } from "../../components/MainButton/MainButton";

const fields = [
  { label: "my offers", icon: "offers" },
  { label: "add an offer", icon: "create" },
  { label: "saved", icon: "saved" },
  { label: "settings", icon: "settings" },
];

export const DashboardStart = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(UserAPI.logout());
    router.push("/auth/login");
  };
  return (
    <div className={styles.dashboard}>
      <section className={styles.fields}>
        {fields.map((field) => (
          <article
            className={styles.field}
            key={field.icon}
            onClick={() =>
              router.push(`/dashboard/${field.label.split(" ").join("-")}`)
            }
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
    </div>
  );
};

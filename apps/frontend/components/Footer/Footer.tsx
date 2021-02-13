import styles from "./Footer.module.scss";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className={styles.foo}>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Other projects</h3>
        <p className={styles.text}>
          We have created many more projects to make life easier. We are
          currently working on further improvements. We do not cease to act to
          make your (and ours &#128513;) life easier thanks to technology. Do
          you want to know more? Check below!
        </p>
        <button className={styles.btn}>Check out</button>
      </div>

      <div className={styles.image}>
        <Image
          src="/images/projects.svg"
          alt="projects"
          width={305}
          height={220}
        />
      </div>
    </footer>
  );
};
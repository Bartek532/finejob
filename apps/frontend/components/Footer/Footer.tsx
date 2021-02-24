import styles from "./Footer.module.scss";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className={styles.foo}>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Other projects</h3>
        <p className={styles.text}>
          We have created many more projects to make life easier. We are
          currently working on further improvements. We do not cease to act to
          make your &#40;and ours &#128513;&#41; life easier thanks to
          technology. Do you want to know more? Check below!
        </p>
        <Link href="https://github.com/Bartek532">
          <a target="_blank">
            <button className={styles.btn}>Check out</button>
          </a>
        </Link>
      </div>

      <div className={styles.image}>
        <Image
          src="/images/projects.svg"
          alt="projects"
          width={305}
          height={220}
        />
      </div>
      <div className={styles.copyright}>
        Copyright &copy; 2021 - Bartosz Zagrodzki
      </div>
    </footer>
  );
};

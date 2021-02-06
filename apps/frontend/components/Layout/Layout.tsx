import { Navbar } from "../Navbar/Navbar";
import styles from "./Layout.module.scss";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.content}>
      {children}
      <Navbar />
    </div>
  );
};

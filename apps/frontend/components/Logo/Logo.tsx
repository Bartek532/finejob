import styles from "./Logo.module.scss";
import { memo } from "react";
import Image from "next/image";

type LogoProps = { readonly withLabel?: boolean };

export const Logo = memo<LogoProps>(({ withLabel }) => {
  if (!withLabel) {
    return <Image src="/icons/logo.svg" width={30} height={40} alt="logo" />;
  }
  return (
    <div className={styles.full}>
      <Image src="/icons/logo.svg" width={43} height={25} alt="logo" />

      <span className={styles.label}>
        Fine<span className={styles.violet}>Job</span>
      </span>
    </div>
  );
});

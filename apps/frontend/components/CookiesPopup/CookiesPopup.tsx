import { memo } from "react";
import styles from "./CookiesPopup.module.scss";
import { useLocalStorage } from "../../lib/hooks/useLocalStorage";

type CookiesPreferences = "not-accepted" | "accepted";

export const CookiesPopup = memo(() => {
  const [accepted, setAccepted] = useLocalStorage<CookiesPreferences>(
    "cookies-accepted",
    "not-accepted",
  );

  if (accepted === "not-accepted") {
    return (
      <div className={styles.cookies}>
        <p>
          This website, like almost every website in the internet, uses cookies
          &#127850;
        </p>
        <button className={styles.btn} onClick={() => setAccepted("accepted")}>
          ok!
        </button>
      </div>
    );
  }

  return null;
});

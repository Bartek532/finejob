import styles from "./ThemeSwitch.module.scss";
import { useEffect } from "react";
import { useLocalStorage } from "../../lib/hooks/useLocalStorage";
import Image from "next/image";

type ThemePreferences = "dark" | "light";

export const ThemeSwitch = () => {
  const [theme, setTheme] = useLocalStorage<ThemePreferences>("theme", "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme || "light");
  }, [theme]);

  return (
    <label className={styles.switch}>
      <span className="sr-only">switch theme</span>
      <input
        type="checkbox"
        className={styles.input}
        checked={theme === "dark"}
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <div className={styles.slider}>
        <div className={styles.circle}>
          <Image
            src={`/icons/theme/${theme}.svg`}
            width={14}
            height={14}
            alt=""
          />
        </div>
      </div>
    </label>
  );
};

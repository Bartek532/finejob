import styles from "./ThemeSwitch.module.scss";
import { memo, useEffect } from "react";
import { useLocalStorage } from "../../lib/hooks/useLocalStorage";
import Image from "next/image";

type ThemePreferences = "dark" | "light";

export const ThemeSwitch = memo(() => {
  const [theme, setTheme] = useLocalStorage<ThemePreferences>("theme", "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme || "light");
  }, [theme]);

  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        className={styles.input}
        checked={theme === "dark"}
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <div className={styles.slider}>
        <div className={styles.circle}>
          <Image src={`/icons/theme/${theme}.svg`} width={14} height={14} />
        </div>
      </div>
    </label>
  );
});

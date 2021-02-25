import CountUp from "react-countup";
import styles from "./Counter.module.scss";

export const Counter = ({ value, time }: { value: number; time: number }) => {
  return (
    <CountUp end={value} duration={time} separator="," delay={0}>
      {({ countUpRef }) => (
        <div>
          <span ref={countUpRef} className={styles.counter} />
        </div>
      )}
    </CountUp>
  );
};

import { memo } from "react";
import CountUp from "react-countup";
import styles from "./Counter.module.scss";

type CounterProps = { readonly value: number; readonly time: number };

export const Counter = memo<CounterProps>(({ value, time }) => {
  return (
    <CountUp end={value} duration={time} separator="," delay={0}>
      {({ countUpRef }) => (
        <div>
          <span ref={countUpRef} className={styles.counter} />
        </div>
      )}
    </CountUp>
  );
});

Counter.displayName = "Counter";

import styles from "./AddOffer.module.scss";
import { Input } from "../../components/Input/Input";
import { MainButton } from "../../components/MainButton/MainButton";
import { Checkbox } from "../../components/Checkbox/Checkbox";
import { memo } from "react";
import classnames from "classnames";

export const AddOffer = memo(() => {
  return (
    <main className={styles.add}>
      <form className={styles.form}>
        <Input name="title" />
        <Input name="location" />

        <Input name="salary" placeholder="salary (in $)" />

        <textarea
          name="description"
          className={classnames(styles.description, styles.textarea)}
          cols={30}
          rows={10}
          placeholder="Description..."
        ></textarea>

        <div className={styles.checkboxes}>
          <Checkbox label="full time" name="type" />
          <Checkbox label="part time" name="type" />
        </div>

        <textarea
          name="apply"
          className={classnames(styles.apply, styles.textarea)}
          cols={30}
          rows={5}
          placeholder="How to apply?"
        ></textarea>
        <MainButton text="Submit" />
      </form>
    </main>
  );
});

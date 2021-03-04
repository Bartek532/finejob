import styles from "./AddOffer.module.scss";
import { Input } from "../../components/Input/Input";
import { MainButton } from "../../components/MainButton/MainButton";
import { Modal } from "../../components/Modal/Modal";
import { Checkbox } from "../../components/Checkbox/Checkbox";
import { inputValidation } from "../../lib/utils/consts";
import { memo } from "react";
import type { OfferWithSalary } from "@finejob/types";
import classnames from "classnames";
import { JobsAPI } from "../../lib/api/offers";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export const AddOffer = memo(() => {
  const { register, handleSubmit, errors, reset } = useForm({
    reValidateMode: "onBlur",
  });

  const router = useRouter();

  const dispatch = useDispatch();

  const handleAddOffer = (data: OfferWithSalary) => {
    dispatch(JobsAPI.createOffer(data));
    console.log(data);
  };

  const handleAcceptModal = () => {
    reset();
    router.push("/dashboard");
  };

  return (
    <>
      <Modal onAccept={handleAcceptModal} />
      <main className={styles.add}>
        <form className={styles.form} onSubmit={handleSubmit(handleAddOffer)}>
          <Input
            name="title"
            inputRef={register(inputValidation.other)}
            error={errors.title}
          />
          <Input
            name="location"
            inputRef={register(inputValidation.other)}
            error={errors.salary}
          />

          <Input
            name="salary"
            placeholder="salary (in $)"
            type="number"
            inputRef={register(inputValidation.other)}
            error={errors.salary}
          />

          <textarea
            name="description"
            className={classnames(styles.description, styles.textarea)}
            cols={30}
            rows={9}
            placeholder="Description..."
            ref={register(inputValidation.other)}
          ></textarea>
          {errors.description ? (
            <span className={styles.error}>{errors.description.message}</span>
          ) : null}

          <div className={styles.checkboxes}>
            <Checkbox
              label="Full Time"
              name="type"
              checked
              inputRef={register}
            />
            <Checkbox label="Part Time" name="type" inputRef={register} />
          </div>

          <div className={styles.apply}>
            <textarea
              name="how_to_apply"
              className={styles.textarea}
              cols={30}
              rows={4}
              placeholder="How to apply?"
              ref={register(inputValidation.other)}
            ></textarea>
            {errors.how_to_apply ? (
              <span className={styles.error}>
                {errors.how_to_apply.message}
              </span>
            ) : null}
          </div>

          <Input
            name="company_url"
            placeholder="Company site (optional)"
            inputRef={register}
          />

          <div className={styles.btn}>
            <MainButton text="Submit" />
          </div>
        </form>
      </main>
    </>
  );
});

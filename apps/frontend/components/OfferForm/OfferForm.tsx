import styles from "./OfferForm.module.scss";
import { Input } from "../../components/Input/Input";
import { MainButton } from "../../components/MainButton/MainButton";
import { Modal } from "../../components/Modal/Modal";
import { Checkbox } from "../../components/Checkbox/Checkbox";
import { inputValidation } from "../../lib/utils/consts";
import { memo, useState, useEffect } from "react";
import type { OfferWithSalary } from "@finejob/types";
import classnames from "classnames";
import { JobsAPI } from "../../lib/api/offers";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

type OfferFormProps = {
  readonly offer?: OfferWithSalary;
  readonly type: "add" | "edit";
};

export const OfferForm = memo<OfferFormProps>(({ offer, type }) => {
  const { register, handleSubmit, errors, reset } = useForm({
    reValidateMode: "onBlur",
  });

  const [areInputsFocused] = useState(!!offer);

  const router = useRouter();

  const dispatch = useDispatch();

  const handleFormSubmit = (data: OfferWithSalary) => {
    if (type === "edit") {
      dispatch(
        JobsAPI.editOffer(offer!.id, { ...data, salary: Number(data.salary) }),
      );
    } else {
      dispatch(JobsAPI.createOffer({ ...data, salary: Number(data.salary) }));
    }
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  useEffect(() => {
    reset(offer);
  }, [offer]);

  const handleAcceptModal = () => {
    reset();
    router.back();
  };

  return (
    <>
      <Modal onAccept={handleAcceptModal} />
      <main className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
          <Input
            name="title"
            inputRef={register(inputValidation.other)}
            error={errors.title?.message}
            shouldBeFocused={areInputsFocused}
          />
          <Input
            name="location"
            inputRef={register(inputValidation.other)}
            error={errors.salary?.message}
            shouldBeFocused={areInputsFocused}
          />

          <Input
            name="salary"
            placeholder="salary (in $)"
            type="number"
            inputRef={register(inputValidation.other)}
            error={errors.salary?.message}
            shouldBeFocused={areInputsFocused}
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
            shouldBeFocused={
              areInputsFocused ? (offer?.company_url ? true : false) : false
            }
          />

          <div className={styles.btn}>
            <MainButton text={`${type === "add" ? "Create" : "Update"}`} />
          </div>
        </form>
      </main>
    </>
  );
});

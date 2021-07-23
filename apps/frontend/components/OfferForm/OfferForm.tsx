import styles from "./OfferForm.module.scss";
import { Input } from "../../components/Input/Input";
import { MainButton } from "../../components/MainButton/MainButton";
import { Modal } from "../../components/Modal/Modal";
import { Checkbox } from "../../components/Checkbox/Checkbox";
import { inputValidation } from "../../lib/utils/consts";
import { memo, useState, useEffect } from "react";
import type { Offer } from "@finejob/types";
import classnames from "classnames";
import { JobsAPI } from "../../lib/api/offers";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { getModalInfo } from "../../store/mainSlice";

type OfferFormProps = {
  readonly offer?: Offer;
  readonly type: "add" | "edit";
};

export const OfferForm = memo<OfferFormProps>(({ offer, type }) => {
  const { register, handleSubmit, errors, reset } = useForm({
    reValidateMode: "onBlur",
  });

  const modal = useSelector(getModalInfo);

  const [areInputsFocused] = useState(!!offer);

  const router = useRouter();

  const dispatch = useDispatch();

  const handleFormSubmit = (data: Offer) => {
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
    reset({});
    router.back();
  };

  const handleCancelModal = () => {
    if (type === "add" && modal.show && modal.type === "success") {
      reset();
    }
  };
  return (
    <>
      <Modal onAccept={handleAcceptModal} onCancel={handleCancelModal} />
      <main className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
          <Input
            name="title"
            inputRef={register(inputValidation.other)}
            error={errors.title?.message}
            shouldBeFocused={areInputsFocused}
          />
          <Input
            name="city"
            inputRef={register(inputValidation.other)}
            error={errors.city?.message}
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
            name="body"
            className={classnames(styles.description, styles.textarea)}
            cols={30}
            rows={9}
            placeholder="Description..."
            ref={register(inputValidation.other)}
          ></textarea>
          {errors.body ? (
            <span className={styles.error}>{errors.body.message}</span>
          ) : null}

          <div className={styles.checkboxes}>
            <Checkbox
              label="junior"
              name="experience_level"
              checked
              inputRef={register}
            />
            <Checkbox label="mid" name="experience_level" inputRef={register} />
            <Checkbox
              label="senior"
              name="experience_level"
              inputRef={register}
            />
          </div>

          <div className={styles.skills}>
            <textarea
              name="skills"
              className={styles.textarea}
              cols={30}
              rows={4}
              placeholder="Skills (separated by comma e.g. JavaScript, HTML etc.)"
              ref={register(inputValidation.other)}
            ></textarea>
            {errors.skills ? (
              <span className={styles.error}>{errors.skills.message}</span>
            ) : null}
          </div>

          <Input
            name="company_url"
            placeholder="Company site (optional)"
            inputRef={register}
            shouldBeFocused={areInputsFocused}
          />

          <div className={styles.btn}>
            <MainButton text={`${type === "add" ? "Create" : "Update"}`} />
          </div>
        </form>
      </main>
    </>
  );
});

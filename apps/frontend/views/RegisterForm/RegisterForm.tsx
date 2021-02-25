import { memo } from "react";
import { UserAPI } from "../../lib/api/user";
import { useForm } from "react-hook-form";
import { Input } from "../../components/Input/Input";
import { inputValidation } from "../../lib/utils/consts";
import type { UserRegisterData } from "../../../types";
import { useDispatch } from "react-redux";

import { MainButton } from "../../components/MainButton/MainButton";
import styles from "./RegisterForm.module.scss";

export const RegisterForm = memo(() => {
  const { handleSubmit, errors, register, reset } = useForm({
    reValidateMode: "onBlur",
  });

  const dispatch = useDispatch();

  const handleFormSubmit = (data: UserRegisterData) => {
    reset();
    dispatch(UserAPI.register(data));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <Input
        name="name"
        error={errors.name}
        inputRef={register(inputValidation.other)}
      />

      <Input
        name="company"
        error={errors.company}
        inputRef={register(inputValidation.other)}
      />

      <Input
        name="email"
        error={errors.email}
        inputRef={register(inputValidation.email)}
      />

      <Input
        name="password"
        type="password"
        error={errors.password}
        inputRef={register(inputValidation.password)}
      />

      <MainButton text="Create an account" type="submit" />
    </form>
  );
});

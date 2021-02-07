import { useState } from "react";
import { UserAPI } from "../../lib/api/user";
import { useForm } from "react-hook-form";
import { Input } from "../Input/Input";
import { inputValidation } from "../../lib/utils/consts";
import type { UserRegisterData } from "../../types";

import { MainButton } from "../MainButton/MainButton";
import styles from "./RegisterForm.module.scss";

export const RegisterForm = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { handleSubmit, errors, register, watch } = useForm({
    reValidateMode: "onBlur",
  });

  const handleFormSubmit = async (data: UserRegisterData) => {
    console.log(data);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

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

      <MainButton text="Create an account" />
    </form>
  );
};

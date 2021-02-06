import React, { useState } from "react";
import { UserAPI } from "../../lib/api/user";
import { useForm } from "react-hook-form";
import { inputValidation } from "../../lib/utils/consts";
import type { UserLoginData } from "../../types";
import { Input } from "../Input/Input";

import { MainButton } from "../MainButton/MainButton";
import styles from "./LoginForm.module.scss";

export const LoginForm = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { handleSubmit, errors, register, watch } = useForm({
    reValidateMode: "onBlur",
  });

  const handleFormSubmit = async ({ email, password }: UserLoginData) => {
    try {
      const { data, status } = await UserAPI.login(email, password);
      if (status !== 200) {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
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

      <MainButton text="Login" />
    </form>
  );
};

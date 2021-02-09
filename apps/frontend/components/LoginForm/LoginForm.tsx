import React, { useState } from "react";
import { UserAPI } from "../../lib/api/user";
import { useForm } from "react-hook-form";
import { inputValidation } from "../../lib/utils/consts";
import type { UserLoginData } from "../../types";
import { Input } from "../Input/Input";
import Link from "next/link";

import { MainButton } from "../MainButton/MainButton";
import styles from "./LoginForm.module.scss";
import { useDispatch } from "react-redux";

export const LoginForm = () => {
  const { handleSubmit, errors, register } = useForm({
    reValidateMode: "onBlur",
  });

  const dispatch = useDispatch();

  const handleFormSubmit = async ({ email, password }: UserLoginData) => {
    dispatch(UserAPI.login(email, password));
  };

  return (
    <>
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
      <section className={styles.info}>
        <Link href="/auth/forgot-password">
          <a className={styles.forgot}>Forgot password? </a>
        </Link>
        <span className={styles.subtitle}>Don't have an account yet?</span>

        <Link href="/auth/register">
          <a className={styles.register}>Sign up!</a>
        </Link>
      </section>
    </>
  );
};

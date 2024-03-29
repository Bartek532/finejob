import { UserAPI } from "../../lib/api/user";
import { useForm } from "react-hook-form";
import { inputValidation } from "../../lib/utils/consts";
import type { UserLoginData } from "@finejob/types";
import { Input } from "../../components/Input/Input";
import Link from "next/link";
import { useRouter } from "next/router";

import { MainButton } from "../../components/MainButton/MainButton";
import styles from "./LoginForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLoginStatus } from "../../store/mainSlice";

export const LoginForm = () => {
  const { handleSubmit, errors, register, reset } = useForm({
    reValidateMode: "onBlur",
  });
  const isLogin = useSelector(getLoginStatus);

  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogin) {
      router.push("/dashboard");
    }
  }, [isLogin]);

  useEffect(() => {
    dispatch(UserAPI.isLogin());
  }, []);

  const handleFormSubmit = async (data: UserLoginData) => {
    reset();
    dispatch(UserAPI.login(data));
  };

  return (
    <main className={styles.login}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
        <Input
          name="email"
          error={errors.email?.message}
          inputRef={register(inputValidation.email)}
        />

        <Input
          name="password"
          type="password"
          error={errors.password?.message}
          inputRef={register(inputValidation.password)}
        />

        <MainButton text="Login" type="submit" />
      </form>
      <section className={styles.info}>
        <span className={styles.subtitle}>Don't have an account yet?</span>

        <Link href="/auth/register">
          <a className={styles.register}>Sign up!</a>
        </Link>
      </section>
    </main>
  );
};

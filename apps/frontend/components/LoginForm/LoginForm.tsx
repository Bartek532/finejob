import React, { useState } from "react";
import { UserAPI } from "../../lib/api/user";
import { useForm } from "react-hook-form";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../lib/utils/consts";
import type { UserLoginData } from "../../types";
import { Input } from "../Input/Input";
import { PasswordInput } from "../Input/PasswordInput";
import { MainButton } from "../MainButton/MainButton";

export const LoginForm = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { handleSubmit, errors, register } = useForm({
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
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Input
          name="email"
          error={errors.email}
          inputRef={register({
            required: { value: true, message: "Email is required." },
            pattern: {
              value: EMAIL_REGEX,
              message: "Email must be a valid email.",
            },
          })}
        />

        <PasswordInput
          error={errors.password}
          inputRef={register({
            required: { value: true, message: "Password is required." },
            pattern: {
              value: PASSWORD_REGEX,
              message:
                "Password must contain an uppercase letter, a special character, a number and must be at least 8 characters long.",
            },
          })}
        />

        <MainButton text="Login" />
      </form>
    </>
  );
};

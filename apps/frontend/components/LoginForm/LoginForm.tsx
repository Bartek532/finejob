import React, { useState } from "react";
import { UserAPI } from "../../lib/api/user";
import { useForm } from "react-hook-form";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../lib/utils/consts";
import type { UserLoginData } from "../../types";
import { Input } from "../Input/Input";
import { PasswordInput } from "../Input/PasswordInput";

export const LoginForm = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { handleSubmit, errors, register } = useForm();

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
          inputRef={register({
            required: { value: true, message: "Email is required." },
            pattern: {
              value: EMAIL_REGEX,
              message: "Email must be a valid email.",
            },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}

        <PasswordInput
          inputRef={register({
            required: { value: true, message: "Password is required." },
            pattern: {
              value: PASSWORD_REGEX,
              message:
                "Password must contain an uppercase letter, a special character, a number and must be at least 8 characters long.",
            },
          })}
        />

        {errors.password && <span>{errors.password.message}</span>}

        <button>Login</button>
      </form>
    </>
  );
};

import type { ChangeEvent } from "react";

export type TextInputProps = {
  type?: string;
  name: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  inputRef?: any;
  error?: { message: string };
};

export type PasswordInputProps = {
  inputRef: any;
  error: { message: string };
};

export type UserLoginData = {
  email: string;
  password: string;
};

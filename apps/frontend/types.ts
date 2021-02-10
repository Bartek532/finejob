import type { ChangeEvent } from "react";

export type TextInputProps = {
  readonly type?: string;
  readonly name: string;
  readonly value?: string;
  readonly onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  readonly inputRef?: any;
  readonly error?: { message: string };
};

export type PasswordInputProps = {
  readonly inputRef: any;
  readonly error: { message: string };
};

export type UserLoginData = {
  readonly email: string;
  readonly password: string;
};

export type UserRegisterData = {
  readonly name: string;
  readonly company: string;
  readonly email: string;
  readonly password: string;
};

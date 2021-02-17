import type { ChangeEvent } from "react";

export type TextInputProps = {
  readonly type?: string;
  readonly name: string;
  readonly value?: string;
  readonly onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  readonly inputRef?: any;
  readonly placeholder?: string;
  readonly error?: { message: string };
  readonly shouldBeFocused: boolean;
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

export type Offer = {
  readonly id: string;
  readonly type: string;
  readonly url: string;
  readonly created_at: string;
  readonly company: string;
  readonly company_url: string;
  readonly location: string;
  readonly title: string;
  readonly description: string;
  readonly how_to_apply: string;
  readonly company_logo: string;
  readonly salary: number;
};

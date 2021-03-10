import type { ChangeEvent, Ref } from "react";

export type TextInputProps = {
  readonly type?: string;
  readonly name: string;
  readonly value?: string;
  readonly onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  readonly inputRef?: (
    ref: HTMLInputElement | null,
  ) => void | Ref<HTMLInputElement | null>;
  readonly placeholder?: string;
  readonly error?: string;
  readonly shouldBeFocused?: boolean;
};

export type PasswordInputProps = {
  readonly inputRef: Ref<HTMLInputElement>;
  readonly error: { message: string };
};

export type LocationAPIResponse = {
  readonly address: {
    readonly city: string;
    readonly country: string;
    readonly country_code: string;
    readonly county: string;
    readonly neighbourhood: string;
    readonly postcode: string;
    readonly road: string;
    readonly school: string;
    readonly state: string;
    readonly state_district: string;
    readonly suburb: string;
  };
  readonly boundingbox: string[];
  readonly display_name: string;
  readonly lat: string;
  readonly licence: string;
  readonly lon: string;
  readonly osm_id: string;
  readonly osm_type: string;
  readonly place_id: string;
};

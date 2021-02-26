import type { ChangeEvent } from "react";

export type TextInputProps = {
  readonly type?: string;
  readonly name: string;
  readonly value?: string;
  readonly onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  readonly inputRef?: any;
  readonly placeholder?: string;
  readonly error?: { message: string };
  readonly shouldBeFocused?: boolean;
};

export type PasswordInputProps = {
  readonly inputRef: any;
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
    readonly state: "województwo śląskie";
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

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
  address: {
    city: string;
    country: string;
    country_code: string;
    county: string;
    neighbourhood: string;
    postcode: string;
    road: string;
    school: string;
    state: "województwo śląskie";
    state_district: string;
    suburb: string;
  };
  boundingbox: string[];
  display_name: string;
  lat: string;
  licence: string;
  lon: string;
  osm_id: string;
  osm_type: string;
  place_id: string;
};

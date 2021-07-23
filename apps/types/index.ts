//Just Join

export type Offer = {
  readonly id: string;
  readonly experience_level: string;
  readonly published_at: any;
  readonly company_name: string;
  readonly company_url: string | null;
  readonly city: string;
  readonly title: string;
  readonly body: string;
  readonly company_logo_url?: string;
  readonly userId?: number;
  readonly skills: Skill[];
  readonly employment_types: {
    type: string;
    salary: { from: number; to: number };
  }[];
  readonly salary: number;
};

type Skill = { readonly name: string };

export type Query = {
  readonly q: string;
  readonly location: string;
  readonly skill: string;
  readonly page: string;
};

//Adzuna
/*
  export type Offer = {
    adref: string;
    category: {
      label: string;
      tag: string;
    };
    company: {
      display_name: string;
    };
    created: string;
    description: string;
    id: string;
    latitude: number;
    location: {
      area: string[];
      display_name: string;
    };
    longitude: number;
    redirect_url: string;
    salary_is_predicted: string;
    salary_max: number;
    salary_min: number;
    title: string;
    color?: string;
  };
  
  export type OffersResults = {
    count: number;
    mean: number;
    results: Offer[];
  };
  
  */

//Users

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

export type User = {
  readonly id: number;
  readonly name: string;
  readonly company: string;
  readonly email: string;
  readonly password: string;
};

//Github Jobs

export type Offer = {
  readonly id: string;
  readonly type: string;
  readonly created_at: any;
  readonly company: string;
  readonly company_url: string | null;
  readonly location: string;
  readonly title: string;
  readonly description: string;
  readonly how_to_apply: string;
  readonly company_logo?: string;
  readonly userId?: number;
};

export type OfferWithSalary = Offer & { salary: number };

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

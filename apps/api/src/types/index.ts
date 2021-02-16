//Github Jobs

export type Offer = {
  id: string;
  type: string;
  url: string;
  created_at: string;
  company: string;
  company_url: string;
  location: string;
  title: string;
  description: string;
  how_to_apply: string;
  company_logo: string;
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

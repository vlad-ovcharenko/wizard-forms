export interface IField<T = string> {
  errors: string[];
  value: T;
  isValid: boolean;
  isTouched: boolean;
  validate(value?: any): boolean;
}
export interface IFields {
  first_name: IField;
  last_name: IField;
  country: IField<"" | ICountryOption> & { options: null | ICountryOption[] };
  has_children: IField<boolean>;
  hobbies: IField<["Hiking" | "Music" | "Programming"] | []> & {
    options: ["Hiking", "Music", "Programming"];
  };
  drives_car: IField<boolean>;
  driving_years: IField;
}

export interface ICountryOption {
  name: string;
  Iso2: string;
  Iso3: string;
}

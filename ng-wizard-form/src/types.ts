export interface IField<T = string> {
  errors: string[]
  value: T
  isValid: boolean
  isTouched: boolean
  validate(value?: any): boolean
}
export type IHobbies = 'Hiking' | 'Music' | 'Programming'
export interface IFields {
  first_name: IField
  last_name: IField
  country: IField<'' | ICountryOption> & { options: null | ICountryOption[] }
  has_children: IField<boolean>
  hobbies: IField<IHobbies[]> & { options: IHobbies[] }
  drives_car: IField<boolean>
  driving_years: IField
}

export interface ICountryOption {
  name: string
  Iso2: string
  Iso3: string
}

export interface IApiPostData {
  first_name: IFields['first_name']['value']
  last_name: IFields['last_name']['value']
  country: ICountryOption['Iso3'] // TS2339: Property 'Iso3' does not exist on type '"" | ICountryOption'.
  has_children: IFields['has_children']['value']
  hobbies: IFields['hobbies']['value']
  drives_car: IFields['drives_car']['value']
  driving_years?: IFields['driving_years']['value']
}

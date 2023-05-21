import {IFields} from "./types";
import {
  toTuple,
  validateCountry,
  validateDriverYears,
  validateName,
} from "./units";

export const fields: IFields = {
  first_name: {
    errors: [],
    value: "",
    isValid: false,
    isTouched: false,
    validate: validateName,
  },
  last_name: {
    errors: [],
    value: "",
    isValid: false,
    isTouched: false,
    validate: validateName,
  },
  country: {
    errors: [],
    value: "",
    isValid: false,
    isTouched: false,
    validate: validateCountry,
    options: null,
  },
  has_children: {
    errors: [],
    value: false,
    isValid: true,
    isTouched: false,
    // For now this field and drives_car is valid by default and cant be invalid.
    // However, I have intentionally left a space for any potential
    // future modifications and risks
    validate() {
      return true;
    },
  },
  hobbies: {
    errors: [],
    value: [],
    isValid: false,
    isTouched: false,
    options: ["Hiking", "Music", "Programming"],
    validate() {
      return true;
    },
  },
  drives_car: {
    errors: [],
    value: false,
    isValid: true,
    isTouched: false,
    validate() {
      return true;
    },
  },
  driving_years: {
    errors: [],
    value: "1",
    isValid: true,
    isTouched: false,
    validate: validateDriverYears,
  },
};

export const steps = toTuple([
  {
    title: "Step one: base info",
    isValid: false,
    fields: {
      first_name: fields.first_name,
      last_name: fields.last_name,
      country: fields.country,
    },
  },
  {
    title: "Step two: Personality",
    isValid: true,
    fields: {
      has_children: fields.has_children,
      hobbies: fields.hobbies,
    },
  },
  {
    title: "Step three: Driving",
    isValid: true,
    fields: {
      drives_car: fields.drives_car,
      driving_years: fields.driving_years,
    },
  },
]);

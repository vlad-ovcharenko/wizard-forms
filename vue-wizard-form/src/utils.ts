import { IField, IFields } from "@/types";

export const toTuple = <T extends [any] | any[]>(args: T): T => args;
export function validateName() {
  const scope = this as IField;
  let isValid = true;
  this.errors = [];
  if (scope.value.length < 3) {
    isValid = false;
    scope.errors.push("Please type more the 2 symbols");
  }
  if (!new RegExp("^[A-Za-z\\s]*$").test(scope.value)) {
    isValid = false;
    scope.errors.push("Please use only English letters.");
  }
  return isValid;
}

export function validateCountry() {
  const scope = this as IFields["country"];
  scope.errors = [];
  if (!scope.value) {
    scope.errors.push("Please Chose your country");
  }
  return !!scope.value;
}

export function validateDriverYears() {
  const scope = this as IFields["driving_years"];
  scope.errors = [];
  let isValid = true;
  console.log(scope.value);

  if (scope.value === "") {
    isValid = false;
    scope.errors.push("Please type valid data");
  }
  if (Number(scope.value) < 0) {
    isValid = false;
    scope.errors.push("Driving years must be more then 0");
  }
  if (Number(scope.value) > 100) {
    isValid = false;
    scope.errors.push("Driving years must be less then 100");
  }
  console.log(scope.errors);
  return isValid;
}

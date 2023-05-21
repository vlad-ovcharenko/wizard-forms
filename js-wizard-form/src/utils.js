export function getBindValidator (context) {
    return {
        first_name: validateFirstName.bind(context),
        last_name: validateLastName.bind(context),
        country: validateCountry.bind(context),
        has_children: () => true,
        hobbies: () => true,
        drives_car: () => true,
        driving_years: validateDriverYears.bind(context)
    }
}
export function validateFirstName(context) {
    console.log('context', context.fields.first_name.value)
    console.log(this.elErrs.firstNameEng.id, this.fields.first_name.value)
    this.elErrs.firstNameMore.style.display = 'none'
    this.elErrs.firstNameEng.style.display = 'none'
    const field = this.fields.first_name
    let isValid = true;

    if (field.value.length < 3) {
        isValid = false;
        if (field.isTouched) this.elErrs.firstNameMore.style.display = 'block'
    }
    if (!new RegExp("^[A-Za-z\\s]*$").test(field.value)) {
        isValid = false;
        if (field.isTouched) this.elErrs.firstNameEng.style.display = 'block'
    }
    return isValid;
}
export function validateLastName() {
    this.elErrs.lastNameMore.style.display = 'none'
    this.elErrs.lastNameEng.style.display = 'none'
    const field = this.fields.last_name

    let isValid = true;
    if (field.value.length < 3) {
        isValid = false;
        if (field.isTouched) this.elErrs.lastNameMore.style.display = 'block'
    }
    if (!new RegExp("^[A-Za-z\\s]*$").test(field.value)) {
        isValid = false;
        if (field.isTouched) this.elErrs.lastNameEng.style.display = 'block'
    }
    return isValid;
}
export function validateCountry() {
    this.elErrs.country.style.display = 'none'
    const field = this.fields.country
    if (!field.value) {
        if (field.isTouched) this.elErrs.country.style.display = 'block'
    }
    return !!field.value;
}


export function validateDriverYears() {
    const field = this.fields.driving_years
    console.log(this.id, this.elErrs.drivingYearsInvalid)
    console.log(this.id, this.elErrs.drivingYearsMoreZero)
    console.log(this.id, this.elErrs.drivingYearsLess100)
    hideDriverYearsErrors(this)

    let isValid = true;

    if (field.value === "") {
        isValid = false;
        if (field.isTouched) this.elErrs.drivingYearsInvalid.style.display = 'block'
    }
    if (Number(field.value) < 0) {
        isValid = false;
        if (field.isTouched) this.elErrs.drivingYearsMoreZero.style.display = 'block'
    }
    if (Number(field.value) > 100) {
        isValid = false;
        if (field.isTouched) this.elErrs.drivingYearsLess100.style.display = 'block'
    }

    return isValid;
}

export function hideDriverYearsErrors(context) {
    context.elErrs.drivingYearsInvalid.style.display = 'none'
    context.elErrs.drivingYearsMoreZero.style.display = 'none'
    context.elErrs.drivingYearsLess100.style.display = 'none'
}
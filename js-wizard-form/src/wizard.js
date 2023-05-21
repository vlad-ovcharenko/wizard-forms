import {createTemplate, steps} from "./consts";
import {
    hideDriverYearsErrors,
    getBindValidator, validateFirstName
} from "./utils";

// import {hideDriverYearsErrors} from "./utils";

export default class WizardForm {
    constructor(containerId, formNumber, JSONData) {
        this.id = formNumber
        this.elContainer = document.getElementById(containerId);
        this.data = JSONData ? JSON.parse(JSONData) : null
        this.currentStepIndex = this.data?.page || 0
        this.validators = getBindValidator(this)
        this.ids = {
            fields: {
                first_name: `first_name_${this.id}`,
                last_name: `last_name_${this.id}`,
                country: `country_${this.id}`,
                has_children_yes: `has_children_yes_${this.id}`,
                has_children_no: `has_children_no_${this.id}`,
                cb_hiking: `cb_hiking_${this.id}`,
                cb_music: `cb_music_${this.id}`,
                cb_programming: `cb_programming_${this.id}`,
                drives_car_yes: `drives_car_yes_${this.id}`,
                drives_car_no: `drives_car_no_${this.id}`,
                driving_years: `driving_years_${this.id}`,
            },
            elems: {
                card: `card_${this.id}`,
                countryLoading: `country_loading_${this.id}`,
                drivingYearsLabel: `driving_years_label_${this.id}`,
                stepFirst: `step_first_${this.id}`,
                stepSecond: `step_second_${this.id}`,
                stepLast: `step_last_${this.id}`,
                btnBack: `btn_back_${this.id}`,
                btnNext: `btn_next_${this.id}`,
                btnSubmit: `btn_submit_${this.id}`,
            },
            errors: {
                firstNameMore: `error_first_name_more_symbols_${this.id}`,
                firstNameEng: `error_first_name_eng_symbols_${this.id}`,
                lastNameMore: `error_last_name_more_symbols_${this.id}`,
                lastNameEng: `error_last_name_eng_symbols_${this.id}`,
                country: `error_country_${this.id}`,
                drivingYearsInvalid: `error_driving_years_invalid_${this.id}`,
                drivingYearsMoreZero: `error_driving_years_more_zero_${this.id}`,
                drivingYearsLess100: `error_driving_years_less_100_${this.id}`
            }
        }
        this.init()
    }

    init() {
        this.steps = {...steps}
        this.fields = {
            first_name: this.steps[0].fields.first_name,
            last_name: this.steps[0].fields.last_name,
            country: this.steps[0].fields.country,
            has_children: this.steps[1].fields.has_children,
            hobbies: this.steps[1].fields.hobbies,
            drives_car: this.steps[2].fields.drives_car,
            driving_years: this.steps[2].fields.driving_years,
        }
        this.insertTemplate()
        this.elFields = {
            first_name: document.getElementById(this.ids.fields.first_name),
            last_name: document.getElementById(this.ids.fields.last_name),
            country: document.getElementById(this.ids.fields.country),
            has_children_yes: document.getElementById(this.ids.fields.has_children_yes),
            has_children_no: document.getElementById(this.ids.fields.has_children_no),
            cb_hiking: document.getElementById(this.ids.fields.cb_hiking),
            cb_music: document.getElementById(this.ids.fields.cb_music),
            cb_programming: document.getElementById(this.ids.fields.cb_programming),
            drives_car_yes: document.getElementById(this.ids.fields.drives_car_yes),
            drives_car_no: document.getElementById(this.ids.fields.drives_car_no),
            driving_years: document.getElementById(this.ids.fields.driving_years),
        }
        this.elems = {
            card: document.getElementById(this.ids.elems.card),
            countryLoading: document.getElementById(this.ids.elems.countryLoading),
            drivingYearsLabel: document.getElementById(this.ids.elems.drivingYearsLabel),
            stepFirst: document.getElementById(this.ids.elems.stepFirst),
            stepSecond: document.getElementById(this.ids.elems.stepSecond),
            stepLast: document.getElementById(this.ids.elems.stepLast),
            btnBack: document.getElementById(this.ids.elems.btnBack),
            btnNext: document.getElementById(this.ids.elems.btnNext),
            btnSubmit: document.getElementById(this.ids.elems.btnSubmit),
        }
        this.elErrs = {
            firstNameMore: document.getElementById(this.ids.errors.firstNameMore),
            firstNameEng: document.getElementById(this.ids.errors.firstNameEng),
            lastNameMore: document.getElementById(this.ids.errors.lastNameMore),
            lastNameEng: document.getElementById(this.ids.errors.lastNameEng),
            country: document.getElementById(this.ids.errors.country),
            drivingYearsInvalid: document.getElementById(this.ids.errors.drivingYearsInvalid),
            drivingYearsMoreZero: document.getElementById(this.ids.errors.drivingYearsMoreZero),
            drivingYearsLess100: document.getElementById(this.ids.errors.drivingYearsLess100)
        }
        this.elSteps = [this.elems.stepFirst, this.elems.stepSecond, this.elems.stepLast]
        this.getCountries()
        this.setPage(this.currentStepIndex)
        this.addListeners()
        if(this.data) this.setInitData()
        this.validateAllSteps()
    }

    setInitData() {
        this.elFields.first_name.value = this.data.first_name || ''
        this.fields.first_name.value = this.data.first_name || ''
        console.log('fields', this.fields.first_name.value)
        console.log('steps', this.steps[0].fields.first_name.value)
        this.elFields.last_name.value = this.data.last_name || ''
        this.fields.last_name.value = this.data.last_name || ''

        this.fields.has_children.value = !!this.data.has_children
        if (this.data.has_children === true || this.data.has_children === false) {
            if (this.data.has_children) this.elFields.has_children_yes.checked = true
            if (!this.data.has_children) this.elFields.has_children_no.checked = true
        } else {
            this.elFields.has_children_yes.checked = true
        }

        // this.fields.hobbies.value = this.data.hobbies
        for (const h of this.data.hobbies) {
            this.changeHobbies(h, true)
            if (h === 'Hiking') this.elFields.cb_hiking.checked = true
            if (h === 'Music') this.elFields.cb_music.checked = true
            if (h === 'Programming') this.elFields.cb_programming.checked = true
        }

        this.fields.drives_car.value = !!this.data.drives_car
        if (this.data.drives_car === true || this.data.drives_car === false) {
            if (this.data.drives_car) this.elFields.drives_car_yes.checked = true
            if (!this.data.drives_car) this.elFields.drives_car_no.checked = true
        } else {
            this.elFields.drives_car_yes.checked = true
        }

        this.fields.driving_years.value = this.data.driving_years || ''
        this.elFields.driving_years.value = this.data.driving_years || ''
    }

    setPage(stepI) {
        for (const elStep of this.elSteps) {
            if (Number(elStep.dataset.stepIndex) === stepI) {
                elStep.style.display = 'block'
            } else {
                elStep.style.display = 'none'
            }
        }
    }

    goForward() {
        const i = ++this.currentStepIndex
        for (const elStep of this.elSteps) {
            if (Number(elStep.dataset.stepIndex) === i) {
                elStep.style.display = 'block'
            } else {
                elStep.style.display = 'none'
            }
        }
        this.elems.btnBack.style.display = 'block'
        if (i === this.elSteps.length - 1) {
            this.elems.btnNext.style.display = 'none'
            this.elems.btnSubmit.style.display = 'block'
        }
    }

    goBack() {
        const i = --this.currentStepIndex
        for (const elStep of this.elSteps) {
            if (Number(elStep.dataset.stepIndex) === i) {
                elStep.style.display = 'block'
            } else {
                elStep.style.display = 'none'
            }
        }
        this.elems.btnNext.style.display = 'block'
        this.elems.btnSubmit.style.display = 'none'
        if (i === 0) {
            this.elems.btnBack.style.display = 'none'
        }
    }

    getCountries() {
        const scope = this
        fetch("https://countriesnow.space/api/v0.1/countries/iso")
            .then(async (res) => {
                if (res.status === 200) {
                    const options = (await res.json()).data

                    this.elems.countryLoading.style.display = 'none'
                    this.elFields.country.style.display = 'block'
                    for (const option of options) {
                        const elOption = document.createElement('option')
                        elOption.text = option.name
                        elOption.value = option.Iso3
                        this.elFields.country.add(elOption)
                    }
                    const index = options.findIndex(op => op.Iso3 === this.data.country)
                    if (index >= 0) {
                        this.elFields.country.value = options[index].Iso3
                        this.fields.country.value = options[index].Iso3
                    }
                    this.validateStep(0)
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    validateAllSteps() {
        for (const i in this.steps) this.validateStep(i)
    }

    validateStep(stepI = this.currentStepIndex) {
        const step = this.steps[stepI]
        let isAllValid = true
        const btn = this.currentStepIndex === this.steps.length - 1 ?
            this.elems.btnSubmit : this.elems.btnNext

        for (const [key, field] of Object.entries(step.fields)) {
            const result = this.validators[key](this)
            field.isValid = result
            if (!result) isAllValid = false

        }
        step.isValid = isAllValid
        if (stepI === this.currentStepIndex) btn.disabled = !isAllValid
    }

    changeHobbies(val, checked) {
        if (checked) this.fields.hobbies.value.push(val)
        else {
            const i = this.fields.hobbies.value.findIndex(v => v === val);
            this.fields.hobbies.value.splice(i, 1)
        }
    }

    addListeners() {
        this.elems.btnNext.addEventListener('click', () => {
            this.goForward()
        })
        this.elems.btnBack.addEventListener('click', () => {
            this.goBack()
        })
        this.elems.btnSubmit.addEventListener('click', () => {
            this.elems.card.innerHTML = `
            <p>first_name: ${this.fields.first_name.value}</p>
            <p>last_name: ${this.fields.last_name.value}</p>
            <p>country: ${this.fields.country.value}</p>
            <p>has_children: ${this.fields.has_children.value}</p>
            <p>hobbies: ${this.fields.hobbies.value}</p>
            <p>drives_car: ${this.fields.drives_car.value}</p>
            <p>driving_years: ${this.fields.driving_years.value}</p>
            `
            this.elems.btnSubmit.style.display = 'none'
            this.elems.btnBack.style.display = 'none'
        })
// step 1: first_name
        this.elFields.first_name.addEventListener('input', (ev) => {
            this.fields.first_name.value = ev.target.value
            this.validateStep()
        })
        this.elFields.first_name.addEventListener('focusout', () => {
            this.fields.first_name.isTouched = true
            this.validators.first_name(this)
            console.log('focusout', this)
        }, {once: true})

// step 1: last_name
        this.elFields.last_name.addEventListener('input', (ev) => {
            this.fields.last_name.value = ev.target.value
            this.validateStep()
        })
        this.elFields.last_name.addEventListener('focusout', () => {
            this.fields.last_name.isTouched = true
            this.validators.last_name()
        }, {once: true})

// step 1: country
        this.elFields.country.addEventListener('input', (ev) => {
            this.fields.country.value = ev.target.value
            this.validateStep()
        })
        this.elFields.country.addEventListener('focusout', () => {
            this.fields.country.isTouched = true
            this.validators.country()
        }, {once: true})

// step 2: children
        this.elFields.has_children_yes.addEventListener('input', () => {
            this.fields.has_children.value = true
        })
        this.elFields.has_children_no.addEventListener('input', () => {
            this.fields.has_children.value = false
        })

// step 2: hobbies
        this.elFields.cb_hiking.addEventListener('input', (ev) => {
            this.changeHobbies('Hiking', ev.target.checked)
        })
        this.elFields.cb_music.addEventListener('input', (ev) => {
            this.changeHobbies('Music', ev.target.checked)
        })
        this.elFields.cb_programming.addEventListener('input', (ev) => {
            this.changeHobbies('Programming', ev.target.checked)
        })

// step 3: drives_car
        this.elFields.drives_car_yes.addEventListener('input', () => {
            this.fields.drives_car.value = true
            this.elems.drivingYearsLabel.style.display = 'block'
            this.elFields.driving_years.style.display = 'block'
            const res = this.validators.driving_years()
            steps[this.currentStepIndex].isValid = res
            this.elems.btnSubmit.style.display = res ? 'block' : 'none'
        })
        this.elFields.drives_car_no.addEventListener('input', () => {
            this.fields.drives_car.value = false
            this.elems.drivingYearsLabel.style.display = 'none'
            this.elFields.driving_years.style.display = 'none'
            this.fields.driving_years.value = '1'
            this.elFields.driving_years.value = '1'
            hideDriverYearsErrors(this)
            steps[this.currentStepIndex].isValid = true
            this.elems.btnSubmit.disabled = false
        })

// step 3: driving_years
        this.elFields.driving_years.addEventListener('input', (ev) => {
            this.fields.driving_years.value = ev.target.value
            const res = this.validators.driving_years()
            steps[this.currentStepIndex].isValid = res
            this.elems.btnSubmit.disabled = !res
        })
        this.elFields.driving_years.addEventListener('focusout', () => {
            this.fields.driving_years.isTouched = true
            const res = this.validators.driving_years()
            steps[this.currentStepIndex].isValid = res
            this.elems.btnSubmit.disabled = !res
        }, {once: true})
    }

    insertTemplate() {
        this.elContainer.innerHTML = createTemplate(this);
    }
}
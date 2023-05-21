import {
    validateCountry,
    validateDriverYears, validateFirstName, validateLastName,
    validateName,
} from "./utils";
export const steps = [
    {
        title: "Step one: base info",
        isValid: false,
        fields: {
            first_name: {
                value: "",
                isValid: false,
                isTouched: false,
            },
            last_name: {
                value: "",
                isValid: false,
                isTouched: false,
            },
            country: {
                value: "",
                isValid: false,
                isTouched: false,
            },
        },
    },
    {
        title: "Step two: Personality",
        isValid: true,
        fields: {
            has_children: {
                value: false,
                isValid: true,
                isTouched: false,
            },
            hobbies: {
                value: [],
                isValid: false,
                isTouched: false,
                options: ["Hiking", "Music", "Programming"],
            },
        },
    },
    {
        title: "Step three: Driving",
        isValid: true,
        fields: {
            drives_car: {
                errors: [],
                value: false,
                isValid: true,
                isTouched: false,
            },
            driving_years: {
                errors: [],
                value: "1",
                isValid: true,
                isTouched: false,
            },
        },
    },
];

export const createTemplate = (context) => {
 return `
 <section class="card" id="${context.ids.elems.card}">
    <div id="${context.ids.elems.stepFirst}" style="display: block" data-step-index="0">
        <p class="title">Step 1: Base data</p>
        <label class="label" for="${context.ids.fields.first_name}">First name *</label>
        <input id="${context.ids.fields.first_name}" class="input-text" placeholder="Type your first name"/>
        <p class="error" id="${context.ids.errors.firstNameMore}">Please type more the 2 symbols</p>
        <p class="error" id="${context.ids.errors.firstNameEng}">Please use only English letters.</p>

        <label class="label" for="${context.ids.fields.last_name}">Last name *</label>
        <input id="${context.ids.fields.last_name}" class="input-text" placeholder="Type your last name"/>
        <p class="error" id="${context.ids.errors.lastNameMore}">Please type more the 2 symbols</p>
        <p class="error" id="${context.ids.errors.lastNameEng}">Please use only English letters.</p>

        <label class="label" for="${context.ids.fields.country}">Country</label>
        <div class="loader-line" id="${context.ids.elems.countryLoading}"></div>
        <select class="select" id="${context.ids.fields.country}">
            <option disabled selected="selected" value="0">please select your country</option>
        </select>
        <p class="error" id="${context.ids.errors.country}">Please chose your country</p>
    </div>
    <div id="${context.ids.elems.stepSecond}" style="display: none" data-step-index="1">
        <p class="title">Step 2: Personal data</p>
        <p class="label"> Have you a children? </p>
        <input name="children_${context.id}" type="radio" id="${context.ids.fields.has_children_yes}" value="yes">
        <label for="${context.ids.fields.has_children_yes}">Yes</label>

        <input name="children_${context.id}" type="radio" id="${context.ids.fields.has_children_no}"  value="no">
        <label for="${context.ids.fields.has_children_no}">No</label>

        <p class="label">Chose your hobby</p>
        <input type="checkbox" id="${context.ids.fields.cb_hiking}" value="Hiking">
        <label for="${context.ids.fields.cb_hiking}">Hiking</label>

        <input type="checkbox" id="${context.ids.fields.cb_music}" value="Music">
        <label for="${context.ids.fields.cb_music}">Music</label>

        <input type="checkbox" id="${context.ids.fields.cb_programming}" value="Programming">
        <label for="${context.ids.fields.cb_programming}">Programming</label>
    </div>
    <div id="${context.ids.elems.stepLast}" style="display: none" data-step-index="2">
        <p class="title">Final step ✨</p>
        <p class="label"> Do you drive a car? </p>
        
        <input type="radio" id="${context.ids.fields.drives_car_yes}" name="drives_car_${context.id}" value="yes" checked>
        <label for="${context.ids.fields.drives_car_yes}">Yes</label>

        <input type="radio" id="${context.ids.fields.drives_car_no}" name="drives_car_${context.id}" value="no">
        <label for="${context.ids.fields.drives_car_no}">No</label>

        <label id="${context.ids.elems.drivingYearsLabel}" class="label" for="${context.ids.fields.driving_years}">Driving years</label>
        <input id="${context.ids.fields.driving_years}" type="number" class="input-text" placeholder="Type your driving years" value="1"/>
        <p class="error" id="${context.ids.errors.drivingYearsInvalid}">Please type valid data</p>
        <p class="error" id="${context.ids.errors.drivingYearsMoreZero}">Driving years must be more than 0</p>
        <p class="error" id="${context.ids.errors.drivingYearsLess100}">Driving years must be less than 100</p>
    </div>
</section>
<div class="button-container">
    <button class="btn-back" id="${context.ids.elems.btnBack}">Back</button>
    <button class="btn-next" id="${context.ids.elems.btnNext}" disabled>Next</button>
    <button class="btn-submit" id="${context.ids.elems.btnSubmit}">Submit</button>
</div>
 `
}
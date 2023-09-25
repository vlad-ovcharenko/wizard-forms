## completed test task
## description
# Frontend Technical Assignment

Hi Vlad,

It was a pleasure talking to you. We are moving forward with your application. The next step is a technical assignment, outlined below. Please complete it by **EOD Monday, May 22nd**.

> **Note**: It's essential to follow the instructions. Please do not deviate from the requirements.

## FRONT-END TASK

Your assignment is to create a multi-page data collection form (referred to as "form wizard") with the following input elements:

### Page 1:
- [TEXT] First name
- [TEXT] Last name
- [SINGLE-SELECT] Country (load asynchronously from [this link](https://documenter.getpostman.com/view/1134062/T1LJjU52#a6eeb719-e591-4b28-ba6c-71e481f71269). Default to blank, use the `iso3` key for value and `name` key for readable labels.)

### Page 2:
- [SINGLE-SELECT] Children: Yes|No
- [MULTI-SELECT] Hobbies: Hiking|Music|Programming

### Page 3:
- [RADIO] Drives a car: Yes|No
- [NUMBER] Driving experience, years (visible only if "Drives a car" is set to "Yes")

### Form Wizard Properties:
- All displayed fields are mandatory.
- The country list should be sourced from [this link](https://documenter.getpostman.com/view/1134062/T1LJjU52#a6eeb719-e591-4b28-ba6c-71e481f71269).
- Use [ng-select](https://github.com/ng-select/ng-select) or similar for Vue.js for the country list.
- The NEXT button on page 1 should only become visible after the country list is loaded from a remote location.
- Move between wizard pages without a page refresh (HTTP request parameters remain unchanged) – like an SPA.
  
### Navigation Controls:
- Page 1: NEXT button
- Page 2: BACK & NEXT buttons
- Page 3: BACK & SUBMIT buttons

On submission, the page should show a JSON object with the accumulated data. The NEXT and SUBMIT buttons should be inactive by default and only enable when necessary fields are filled out. Display validation errors next to fields that failed to validate (blur the element if possible).

### Implementation Requirements:
- Implement in both Angular/Vue.js and pure ES6 JavaScript.
- For Angular/Vue.js, manage state using NgRx/Vuex/Pinia or alike.
- For the plain JavaScript version, use an ES6 class for the wizard's instantiation and initial state setting based on an input JSON object.
    - The class constructor should accept a DIV container ID.
    - Optionally, the constructor should take in a JSON object to set the wizard's initial state.
    - The initial state should support the current page number.
- Style UI elements using Tailwind CSS.

### Example State JSON:
To render page 2 of the form wizard with the "NEXT" button enabled:
json {
    "first_name": "John",
    "last_name": "Smith",
    "country": "CAN",
    "has_children": false,
    "hobbies": ["Music"],
    "page": 2
}

**Note**
- **Field Validation**: Each field uses individual validation functions for greater adaptability. For instance, the "has_children" field currently employs a simple validator `() => true`. While this may appear superfluous at present, it caters to possible future amendments. There might arise scenarios necessitating users to possess a minimum of one hobby or similar stipulations.
- **Tailwind with JavaScript**: To expedite development, I incorporated custom Tailwind styles exclusively for the JavaScript version.

### [Angular Version](https://ng-wizard-form.surge.sh/)
- **UI Library Constraints**: The [ng-select repository](https://github.com/ng-select/ng-select) wasn't compatible with the current Angular version. However, I leveraged the [Angular Material library](https://material.angular.io) as an alternative. It offers comparable functionalities.
- **Styling with Tailwind**: I utilized Tailwind in conjunction with Angular Material for a cohesive design approach.

### [JavaScript Version](https://js-wizard-form.surge.sh/)

### [Vue Version](https://vue-wizard-form.surge.sh/)
- **Styling Approach**: In this version, Tailwind was adopted in tandem with Vuetify, a popular UI library tailored for Vue.

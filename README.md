## General Notes

- **Field Validation**: Each field uses individual validation functions for greater adaptability. For instance, the "has_children" field currently employs a simple validator `() => true`. While this may appear superfluous at present, it caters to possible future amendments. There might arise scenarios necessitating users to possess a minimum of one hobby or similar stipulations.
- **Tailwind with JavaScript**: To expedite development, I incorporated custom Tailwind styles exclusively for the JavaScript version.

### [Angular Version](https://ng-wizard-form.surge.sh/)
- **UI Library Constraints**: The [ng-select repository](https://github.com/ng-select/ng-select) wasn't compatible with the current Angular version. However, I leveraged the [Angular Material library](https://material.angular.io) as an alternative. It offers comparable functionalities.
- **Styling with Tailwind**: I utilized Tailwind in conjunction with Angular Material for a cohesive design approach.

### [JavaScript Version](https://js-wizard-form.surge.sh/)

### [Vue Version](https://vue-wizard-form.surge.sh/)
- **Styling Approach**: In this version, Tailwind was adopted in tandem with Vuetify, a popular UI library tailored for Vue.

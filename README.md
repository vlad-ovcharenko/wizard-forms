general notes:
* I have used validation functions for each field to provide flexibility. For example, the "has_children" field currently has a simple validator `() => true`. This may seem unnecessary now, but it allows for future changes. In certain cases, there might be requirements where the user must have at least one hobby or other conditions.
* I have utilized custom Tailwind styles only for the JavaScript version to save time. This approach helped expedite the development process.

[angular version](https://ng-wizard-form.surge.sh/)

* unfortunately it was impossible to use https://github.com/ng-select/ng-select with actual version of angular. But I have used the alternative ui components libary designed specificly for Angular https://material.angular.io. There is the same functionality
* tailwind was used as addition to Material design (UI library designed for Angular)

[js version](https://js-wizard-form.surge.sh/)

[vue version](https://vue-wizard-form.surge.sh/)
* tailwind was used as addition to Vuetify (UI library designed for Vue)

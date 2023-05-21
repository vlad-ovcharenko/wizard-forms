<template>
  <v-app class="pa-6">
    <v-dialog v-model="state.isResultShown" max-width="400">
      <v-card>
        <v-card-title> before JSON.stringify() </v-card-title>
        <v-card-text>
          <pre>{{ apiPostData }}</pre>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-main style="width: 300px; margin: 0 auto">
      <h2>{{ state.steps[state.currentStepIndex].title }}</h2>
      <v-card class="pa-6 mt-6 w-100" v-show="state.currentStepIndex === 0">
        <v-text-field
          label="First Name"
          :value="fds.first_name.value"
          @input="onValueChange('first_name', $event.target.value)"
          @focus.once="fds.first_name.isTouched = true"
          :error-messages="
            fds.first_name.isTouched ? fds.first_name.errors : []
          "
        ></v-text-field>
        <v-text-field
          label="Last Name"
          :value="fds.last_name.value"
          @input="onValueChange('last_name', $event.target.value)"
          @focus.once="fds.last_name.isTouched = true"
          :error-messages="fds.last_name.isTouched ? fds.last_name.errors : []"
        ></v-text-field>
        <v-select
          label="Select yor country"
          :items="fds.country.options ? fds.country.options : []"
          item-title="name"
          @focusout.once="fds.country.isTouched = true"
          :loading="!fds.country.options"
          v-model="state.fields.country.value"
          @update:model-value="onSelect"
          :error-messages="fds.country.isTouched ? fds.country.errors : []"
        >
        </v-select>
      </v-card>

      <v-card class="pa-6 mt-6 w-100" v-show="state.currentStepIndex === 1">
        <v-radio-group
          inline
          label="Hava You a children?"
          v-model="fds.has_children.value"
        >
          <v-radio
            label="Yes"
            :checked="fds.has_children.value"
            :value="true"
          ></v-radio>
          <v-radio
            label="No"
            :value="false"
            :checked="!fds.has_children.value"
          ></v-radio>
        </v-radio-group>
        <p class="v-label">Your hobbies</p>
        <v-checkbox
          hide-details
          density="compact"
          v-for="hobby in fds.hobbies.options"
          :label="hobby"
          :value="hobby"
          :key="hobby"
          v-model="fds.hobbies.value"
        />
      </v-card>

      <v-card
        class="pa-6 mt-6"
        style="width: 100%"
        v-show="state.currentStepIndex === 2"
      >
        <v-radio-group
          @update:model-value="updateCar"
          inline
          label="Do u drive a car?"
          v-model="fds.drives_car.value"
        >
          <v-radio
            label="Yes"
            :checked="fds.drives_car.value"
            :value="true"
          ></v-radio>
          <v-radio
            label="No"
            :value="false"
            :checked="!fds.drives_car.value"
          ></v-radio>
        </v-radio-group>

        <v-text-field
          v-show="fds.drives_car.value"
          @input="onValueChange('driving_years', $event.target.value)"
          @focus.once="fds.driving_years.isTouched = true"
          :value="fds.driving_years.value"
          :error-messages="
            fds.driving_years.isTouched ? fds.driving_years.errors : []
          "
          single-line
          type="number"
        />
      </v-card>

      <div class="pt-6 d-flex justify-space-between">
        <v-btn
          v-show="state.currentStepIndex > 0"
          @click="state.currentStepIndex--"
        >
          Back
        </v-btn>
        <v-btn
          v-show="state.steps.length - 1 === state.currentStepIndex"
          :disabled="!state.steps[state.steps.length - 1].isValid"
          @click="postData"
        >
          Submit
        </v-btn>
        <v-btn
          class="ml-auto"
          v-show="state.currentStepIndex < state.steps.length - 1"
          :disabled="!state.steps[state.currentStepIndex].isValid"
          @click="state.currentStepIndex++"
        >
          next
        </v-btn>
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { IFields, ICountryOption } from "@/types";
import { fields, steps } from "@/consts";

const state = reactive({
  isResultShown: false,
  fields,
  steps,
  currentStepIndex: 0,
});
const apiPostData = ref<any>(null);
const fds = state.fields;

fetch("https://countriesnow.space/api/v0.1/countries/iso")
  .then(async (res) => {
    if (res.status === 200) {
      fds.country.options = (await res.json()).data;
    }
  })
  .catch((err) => {
    console.log(err);
  });

function onValueChange(key: keyof IFields, v: IFields[typeof key]["value"]) {
  const step = state.steps[state.currentStepIndex];
  let isAllValid = true;

  fds[key].value = v;

  for (const [_key, field] of Object.entries(step.fields)) {
    const result = field.validate();
    field.isValid = result;
    if (!result) isAllValid = false;
  }

  step.isValid = isAllValid;
}

function onSelect(v: string) {
  const item = fds.country.options?.find(
    (val) => val.name === v
  ) as ICountryOption;

  onValueChange("country", item);
}
function updateCar(ev: boolean) {
  fds.driving_years.value = "1";
  fds.driving_years.errors = [];
  state.steps[2].isValid = true;
  console.log(fds.drives_car.value, ev);
}

function postData() {
  state.isResultShown = true;
  apiPostData.value = {
    first_name: fields.first_name.value,
    last_name: fields.last_name.value,
    hobbies: fields.hobbies.value,
    drives_car: fields.drives_car.value,
  };
  if (typeof fields.country.value !== "string") {
    apiPostData.value.country = fields.country.value.Iso3;
  }
  if (fields.drives_car.value) {
    apiPostData.value.driving_years = Number(fields.driving_years.value);
  }
}
</script>

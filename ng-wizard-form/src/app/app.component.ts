import {Component, Inject} from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { fields, steps } from '../consts'
import {IApiPostData, ICountryOption, IFields, IHobbies} from '../types'
import {OnInit} from "@angular/core";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'nd-wizard-form'
  fields = fields
  steps = steps
  currentStepIndex = 0
  apiPostData: null | IApiPostData = null
  isResultShown = false


  ngOnInit() {
    this.getCountries()
  }

  getCountries () {
    fetch("https://countriesnow.space/api/v0.1/countries/iso")
      .then(async (res) => {
        if (res.status === 200) {
          fields.country.options = (await res.json()).data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  validateStep () {
    const step = this.steps[this.currentStepIndex]
    let isAllValid = true
    for (const [key, field] of Object.entries(step.fields)) {
      const result = field?.validate()
      field.isValid = result
      if (!result) isAllValid = false
    }
    step.isValid = isAllValid
  }
  onTextChange(key: 'first_name' | 'last_name' | 'driving_years', ev: Event) {
    this.fields[key].value = (ev.target as HTMLInputElement).value

    this.validateStep()
  }

  onSelect(countryOption: ICountryOption) {
    this.fields.country.value = countryOption

    this.validateStep()
  }
  onHobby(key: IHobbies, v: boolean) {
    if (v) {
      this.fields.hobbies.value.push(key)
    } else {
      const i = this.fields.hobbies.value.findIndex(val => val === key);
      this.fields.hobbies.value.splice(i, 1)
    }
    console.log(this.fields.hobbies.value)
  }
  test(ev: any) {
    console.log('!!!', ev)
  }

  updateCar() {
    this.fields.drives_car.value = !this.fields.drives_car.value
    this.fields.driving_years.value = "1";
    this.fields.driving_years.errors = [];
    this.fields.driving_years.isTouched = false
    this.steps[2].isValid = true;
  }

  postData() {
    this.isResultShown = true;
    this.apiPostData = {
      first_name: this.fields.first_name.value,
      last_name: this.fields.last_name.value,
      hobbies: this.fields.hobbies.value,
      country: typeof this.fields.country.value !== 'string' ? this.fields.country.value.Iso3 : '',
      drives_car: this.fields.drives_car.value,
      has_children: this.fields.has_children.value
    };

    if (this.apiPostData && this.fields.drives_car.value) {
      this.apiPostData.driving_years = this.fields.driving_years.value;
    }
  }

  protected readonly JSON = JSON;
}

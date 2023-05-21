import './style.css';
import WizardForm from "./wizard";

let formAmount = 1
const forms = document.getElementById('forms')
const elAddForm = document.getElementById('btn_add_form')

elAddForm.addEventListener('click', () => {
    const id = `form_${formAmount}`
    const formNumber = id
    const el = document.createElement('div')

    formAmount++
    el.id = id
    forms.appendChild(el)
    new WizardForm(id, formNumber, JSON.stringify({
        "first_name": ['Kira', 'Vlad', 'John', 'Alex', 'Ismail'][Math.floor(Math.random() * 5)],
        "last_name": ['Ovcharenko', 'Smith', 'Piterson', 'Pattison', 'Kaia'][Math.floor(Math.random() * 5)],
        "country": "CAN",
        "has_children": false,
        "hobbies": ["Music"],
        "page": 0
    }))
})

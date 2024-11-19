import { domElements } from './domelem.js';

export const studentId = JSON.parse(sessionStorage.getItem('studentId')) || [];
export let getLoginId = JSON.parse(sessionStorage.getItem('studentId')) || [];

document.addEventListener('DOMContentLoaded', () => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const NAME_TEXT_ERROR =
    'Le nom doit contenir uniquement des lettres entre 5 et 25 caractères !';
  const EMAIL_TEXT_ERROR = "Le format email n'est pas valide !";

  let nameValid = false;
  let emailValid = false;
  domElements.logged.value = false;
  // let isValid = nameValid && emailValid;

  function validateName() {
    if (domElements.name === null) {
      return;
    }

    const nameValue = domElements.name.value;
    const isNameLengthValid = nameValue.length >= 5 && nameValue.length < 25;
    const hasNoDigits = !/\d/.test(nameValue);
    const isNotEmpty = nameValue !== '';
    const isNameInvalid = !(isNameLengthValid && hasNoDigits && isNotEmpty);

    if (isNameInvalid && domElements.errorName) {
      domElements.errorName.textContent = NAME_TEXT_ERROR;
      domElements.errorName.classList.replace('hide', 'show');
      domElements.name.classList.remove('valid');
      nameValid = false;
    } else if (domElements.errorName && !isNameInvalid) {
      domElements.errorName.textContent = '';
      domElements.errorName.classList.replace('show', 'hide');
      domElements.name.classList.add('valid');
      nameValid = true;
    }
  }

  function validateEmail() {
    if (domElements.email) {
      const isValidEmail = emailRegex.test(domElements.email.value);
      if (domElements.errorEmail && !isValidEmail) {
        domElements.errorEmail.textContent = EMAIL_TEXT_ERROR;
        domElements.errorEmail.classList.replace('hide', 'show');
        domElements.email.classList.remove('valid');
        emailValid = false;
      } else {
        if (domElements.errorEmail) {
          domElements.errorEmail.textContent = '';
          domElements.errorEmail.classList.replace('show', 'hide');
          domElements.email.classList.add('valid');
          emailValid = true;
        }
      }
    }
  }

  function isValidForm(event) {
    event.preventDefault();
    if (nameValid && emailValid) {
      studentId.push(domElements.name.value);
      studentId.push(domElements.email.value);
      domElements.logged.value = true;
      sessionStorage.setItem('loginId', JSON.stringify(studentId));
      getLoginId = JSON.parse(sessionStorage.getItem('loginId'));
      location.href = `choose.html?name=${domElements.name.value}&logged=${domElements.logged.value}`;
    }
  }
  domElements.form.addEventListener('submit', isValidForm);

  if (domElements.email) {
    domElements.email.addEventListener('focus', validateEmail);
    domElements.email.addEventListener('keyup', validateEmail);
  }

  if (domElements.name) {
    domElements.name.addEventListener('focus', validateName);
    domElements.name.addEventListener('keyup', validateName);
  }
});

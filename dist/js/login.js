import { domElements } from './domelem.js';

export const studentId = JSON.parse(sessionStorage.getItem('studentId')) || [];
export let getLoginId = JSON.parse(sessionStorage.getItem('loginId')) || [];

export function clearSessionStorage() {
  sessionStorage.removeItem('allQuiz');
  sessionStorage.removeItem('answers');
  sessionStorage.removeItem('loginId');
}

const { name, email, logged, form, errorName, errorEmail } = domElements;

document.addEventListener('DOMContentLoaded', () => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const NAME_TEXT_ERROR =
    'Le nom doit contenir uniquement des lettres entre 5 et 25 caractères !';
  const EMAIL_TEXT_ERROR = "Le format email n'est pas valide !";

  let nameValid = false;
  let emailValid = false;

  function validateName() {
    if (name === null) {
      return;
    }

    const nameValue = name.value;
    const isNameLengthValid = nameValue.length >= 3 && nameValue.length < 15;
    const hasNoDigits = !/\d/.test(nameValue);
    const isNotEmpty = nameValue !== '';
    const isNameInvalid = !(isNameLengthValid && hasNoDigits && isNotEmpty);

    if (isNameInvalid && errorName) {
      errorName.textContent = NAME_TEXT_ERROR;
      errorName.classList.replace('hide', 'show');
      name.classList.remove('valid');
      nameValid = false;
    } else if (errorName && !isNameInvalid) {
      errorName.textContent = '';
      errorName.classList.replace('show', 'hide');
      name.classList.add('valid');
      nameValid = true;
    }
  }

  function validateEmail() {
    if (email) {
      const isValidEmail = emailRegex.test(email.value);
      if (errorEmail && !isValidEmail) {
        errorEmail.textContent = EMAIL_TEXT_ERROR;
        errorEmail.classList.replace('hide', 'show');
        email.classList.remove('valid');
        emailValid = false;
      } else {
        if (errorEmail) {
          errorEmail.textContent = '';
          errorEmail.classList.replace('show', 'hide');
          email.classList.add('valid');
          emailValid = true;
        }
      }
    }
  }

  function isValidForm(event) {
    event.preventDefault();
    if (nameValid && emailValid) {
      studentId.push(name.value);
      studentId.push(email.value);
      logged.value = true;
      clearSessionStorage();
      sessionStorage.setItem('loginId', JSON.stringify(studentId));
      getLoginId = JSON.parse(sessionStorage.getItem('loginId'));
      location.href = `choose.html`;
    }
  }

  if (form) {
    form.addEventListener('submit', isValidForm);
  }

  if (email) {
    email.addEventListener('focus', validateEmail);
    email.addEventListener('keyup', validateEmail);
  }

  if (name) {
    name.addEventListener('focus', validateName);
    name.addEventListener('keyup', validateName);
  }
});

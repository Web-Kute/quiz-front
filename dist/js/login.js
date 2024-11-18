import { domElements } from './domelem.js';

export const studentId = JSON.parse(sessionStorage.getItem('studentId')) || [];
export let getLoginId = JSON.parse(sessionStorage.getItem('studentId')) || [];

document.addEventListener('DOMContentLoaded', () => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const NAME_TEXT_ERROR = 'Le nom doit contenir entre 5 et 25 caractères !';
  const EMAIL_TEXT_ERROR = "Le format email n'est pas valide !";

  let isValid = false;

  // const connectOnLoad = JSON.parse(sessionStorage.getItem('loginId') || '[]');
  // name.value = connectOnLoad[0];
  // email.value = connectOnLoad[1];

  function validateName() {
    if (domElements.name === null) {
      return;
    }
    // if (connectOnLoad) {
    //   name.value = connectOnLoad[0];
    // }
    const checkName =
      domElements.name.value.length < 5 ||
      domElements.name.value.length >= 25 ||
      /\d/.test(domElements.name.value ?? '') ||
      domElements.name.value === '';

    if (checkName && domElements.errorName) {
      domElements.errorName.textContent = NAME_TEXT_ERROR;
      domElements.errorName.classList.replace('hide', 'show');
      isValid = false;
    } else if (domElements.errorName) {
      domElements.errorName.textContent = '';
      domElements.errorName.classList.replace('show', 'hide');
      isValid = true;
    }
  }

  function validateEmail() {
    if (domElements.email) {
      const test =
        domElements.email.value.length === 0 ||
        emailRegex.test(domElements.email.value);
      // email.value = connectOnLoad[1];
      // Chaque fois que l'utilisateur saisit quelque chose
      // on vérifie la validité du champ e-mail.
      if (domElements.errorEmail && !test) {
        domElements.errorEmail.textContent = EMAIL_TEXT_ERROR;
        domElements.errorEmail.classList.replace('hide', 'show');
        isValid = false;
      } else {
        if (domElements.errorEmail) {
          domElements.errorEmail.textContent = '';
          domElements.errorEmail.classList.replace('show', 'hide');
          isValid = true;
        }
      }
    }
  }
  if (domElements.form) {
    domElements.form.addEventListener(
      'submit',
      function (event) {
        // Chaque fois que l'utilisateur tente d'envoyer les données
        // on vérifie que le champ email est valide.
        console.log('logged', domElements.logged.value);

        if (isValid) {
          studentId.push(domElements.name.value);
          studentId.push(domElements.email.value);
          domElements.logged.value = true;
        } else {
          domElements.logged.value = false;
        }

        sessionStorage.setItem('loginId', JSON.stringify(studentId));
        getLoginId = JSON.parse(sessionStorage.getItem('loginId'));

        if (
          domElements.email &&
          domElements.errorEmail &&
          !emailRegex.test(domElements.email.value)
        ) {
          // S'il est invalide, on affiche un message d'erreur personnalisé
          domElements.errorEmail.innerHTML = EMAIL_TEXT_ERROR;
          domElements.errorEmail.classList.replace('hide', 'show');
          // Et on empêche l'envoi des données du formulaire
          event.preventDefault();
        }
      },
      false,
    );
  }

  if (domElements.email) {
    domElements.email.addEventListener('focus', validateEmail);
    domElements.email.addEventListener('keyup', validateEmail);
  }

  if (domElements.name) {
    domElements.name.addEventListener('focus', validateName);
    domElements.name.addEventListener('keyup', validateName);
  }
});

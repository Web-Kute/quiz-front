// import { saveFile } from "./filesaver.js";
document.addEventListener('DOMContentLoaded', function () {
  var name = document.getElementById('name');
  var email = document.getElementById('email');
  var form = document.getElementById('login');
  // const submitBtn: HTMLInputElement | null = document.getElementById(
  //   'submit',
  // ) as HTMLInputElement;
  var errorName = document.getElementById('error-name');
  var errorEmail = document.getElementById('error-email');
  var emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var NAME_TEXT_ERROR = 'Le nom doit contenir entre 5 et 25 caractères !';
  var EMAIL_TEXT_ERROR = "Le format email n'est pas valide !";
  var studentId = [];
  var isValid = false;
  // const connectOnLoad = JSON.parse(sessionStorage.getItem('loginId') || '[]');
  // name.value = connectOnLoad[0];
  // email.value = connectOnLoad[1];
  function validateName() {
    var _a;
    if (name === null) {
      return;
    }
    // if (connectOnLoad) {
    //   name.value = connectOnLoad[0];
    // }
    var checkName =
      name.value.length < 5 ||
      name.value.length >= 25 ||
      /\d/.test((_a = name.value) !== null && _a !== void 0 ? _a : '') ||
      name.value === '';
    if (checkName && errorName) {
      errorName.textContent = NAME_TEXT_ERROR;
      errorName.classList.replace('hide', 'show');
      isValid = false;
    } else if (errorName) {
      errorName.textContent = '';
      errorName.classList.replace('show', 'hide');
      isValid = true;
    }
  }
  function validateEmail() {
    if (email) {
      var test = email.value.length === 0 || emailRegex.test(email.value);
      // email.value = connectOnLoad[1];
      // Chaque fois que l'utilisateur saisit quelque chose
      // on vérifie la validité du champ e-mail.
      if (errorEmail && !test) {
        errorEmail.textContent = EMAIL_TEXT_ERROR;
        errorEmail.classList.replace('hide', 'show');
        isValid = false;
      } else {
        if (errorEmail) {
          errorEmail.textContent = '';
          errorEmail.classList.replace('show', 'hide');
          isValid = true;
        }
      }
    }
  }
  if (form) {
    form.addEventListener(
      'submit',
      function (event) {
        // Chaque fois que l'utilisateur tente d'envoyer les données
        // on vérifie que le champ email est valide.
        if (isValid) {
          studentId.push(name.value);
          studentId.push(email.value);
        }
        sessionStorage.setItem('loginId', JSON.stringify(studentId));
        if (email && errorEmail && !emailRegex.test(email.value)) {
          // S'il est invalide, on affiche un message d'erreur personnalisé
          errorEmail.innerHTML = EMAIL_TEXT_ERROR;
          errorEmail.classList.replace('hide', 'show');
          // Et on empêche l'envoi des données du formulaire
          event.preventDefault();
        }
      },
      false,
    );
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

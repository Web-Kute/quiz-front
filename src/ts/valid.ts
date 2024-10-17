document.addEventListener('DOMContentLoaded', (): void => {
  const name: HTMLInputElement | null = document.getElementById(
    'name',
  ) as HTMLInputElement;
  const email: HTMLInputElement | null = document.getElementById(
    'email',
  ) as HTMLInputElement;
  const form: HTMLFormElement | null = document.getElementById(
    'login',
  ) as HTMLFormElement;
  // const submitBtn: HTMLInputElement | null = document.getElementById(
  //   'submit',
  // ) as HTMLInputElement;

  const errorName: HTMLElement | null = document.getElementById('error-name');
  const errorEmail: HTMLElement | null = document.getElementById('error-email');

  const emailRegex: RegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const NAME_TEXT_ERROR = 'Le nom doit contenir entre 5 et 25 caractères !';
  const EMAIL_TEXT_ERROR = "Le format email n'est pas valide !";

  const studentId: string[] = [];
  let isValid: boolean = false;

  // const connectOnLoad = JSON.parse(sessionStorage.getItem('loginId') || '[]');
  // name.value = connectOnLoad[0];
  // email.value = connectOnLoad[1];

  function validateName(): void {
    if (name === null) {
      return;
    }
    // if (connectOnLoad) {
    //   name.value = connectOnLoad[0];
    // }
    const checkName: boolean =
      name.value.length < 5 ||
      name.value.length >= 25 ||
      /\d/.test(name.value ?? '') ||
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
      const test = email.value.length === 0 || emailRegex.test(email.value);
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
      function (event: Event) {
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

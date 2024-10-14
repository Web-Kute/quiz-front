// document.addEventListener('DOMContentLoaded', (): void => {
//   const form: HTMLFormElement | null = document.getElementById(
//     'login',
//   ) as HTMLFormElement;
//   const nameInput: HTMLInputElement | null = document.getElementById(
//     'name',
//   ) as HTMLInputElement;
//   const emailInput: HTMLInputElement | null = document.getElementById(
//     'email',
//   ) as HTMLInputElement;

//   const submitBtn: HTMLInputElement | null = document.getElementById(
//     'submit',
//   ) as HTMLInputElement;

//   const errorName: HTMLElement | null = document.getElementById('error-name');
//   const errorEmail: HTMLElement | null = document.getElementById('error-email');

//   const NAME_TEXT_ERROR = 'Le nom doit contenir entre 5 et 25 caractères !';
//   const EMAIL_TEXT_ERROR = "Le format email n'est pas valide !";

//   let studentId: string[] = [];
//   let isValid: boolean = false;
//   let checkName =
//     nameInput?.value.length < 5 ||
//     nameInput?.value.length >= 25 ||
//     /\d/.test(nameInput?.value ?? '') ||
//     nameInput?.value === '';

//   const emailRegex: RegExp =
//     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//   const connectOnLoad = JSON.parse(sessionStorage.getItem('loginId') || '[]');

//   function init(): void {
//     if (nameInput && emailInput && submitBtn) {
//       nameInput.value = connectOnLoad[0] || '';
//       emailInput.value = connectOnLoad[1] || '';
//       submitBtn.innerText = 'Se connecter';
//       isValid = true;
//     }
//     if (connectOnLoad.length > 0) {
//       if (nameInput) {
//         nameInput.value = '';
//       }
//       if (emailInput) {
//         emailInput.value = '';
//       }
//       studentId = [];
//       isValid = false;
//     }
//   }

//   // function validateName(): void {
//   //   if (nameInput === null) {
//   //     return;
//   //   }
//   //   if (nameInput.value.length < 5 || nameInput.value.length >= 25) {
//   //     if (errorName) {
//   //       errorName.textContent = NAME_TEXT_ERROR;
//   //       errorName.classList.replace('hide', 'show');
//   //       isValid = false;
//   //     }
//   //   } else {
//   //     if (errorName) {
//   //       errorName.classList.replace('show', 'hide');
//   //       nameInput.setAttribute('value', nameInput.value);
//   //       isValid = true;
//   //     }
//   //   }
//   // }

//   // function validateName(): void {
//   //   if (nameInput === null) {
//   //     return;
//   //   }
//   //   if (nameInput) {
//   //     if (checkName) {
//   //       if (errorName) {
//   //         errorName.textContent = NAME_TEXT_ERROR;
//   //         errorName.classList.replace('hide', 'show');
//   //       }
//   //     } else {
//   //       if (errorName) {
//   //         errorName.classList.replace('show', 'hide');
//   //         nameInput.setAttribute('value', nameInput.value);
//   //         isValid = true;
//   //       }
//   //     }
//   //   }
//   // }

//  function validateName(): void {
//    if (nameInput) {
//      checkName =
//        nameInput?.value?.length < 5 ||
//        nameInput?.value?.length >= 25 ||
//        /\d/.test(nameInput?.value ?? '') ||
//        nameInput?.value === '';
//    }
//    if (nameInput) {
//      if (checkName) {
//        if (errorName) {
//          errorName.textContent = NAME_TEXT_ERROR;
//          errorName.classList.replace('hide', 'show');
//        }
//      } else {
//        if (errorName) {
//          errorName.classList.replace('show', 'hide');
//          nameInput.setAttribute('value', nameInput.value);
//          isValid = true;
//        }
//      }
//    }
//  }

//   function validateEmail(): void {
//     if (emailInput === null) {
//       return;
//     }
//     if (!emailRegex.test(emailInput.value)) {
//       if (errorEmail) {
//         errorEmail.textContent = EMAIL_TEXT_ERROR;
//         errorEmail.classList.replace('hide', 'show');
//       }
//     } else {
//       if (errorEmail) {
//         errorEmail.classList.replace('show', 'hide');
//         emailInput.setAttribute('value', emailInput.value);
//         isValid = true;
//       }
//     }
//   }

//   function handleError(): void {
//     if (nameInput) {
//       if (checkName) {
//         if (errorName) {
//           errorName.textContent = NAME_TEXT_ERROR;
//           errorName.classList.replace('hide', 'show');
//           isValid = false;
//         }
//       } else {
//         if (errorName) {
//           errorName.classList.replace('show', 'hide');
//           nameInput.setAttribute('value', nameInput.value);
//           isValid = true;
//         }
//       }
//     }

//     document.addEventListener('click', (e) => {
//       const target = e.target as HTMLElement;
//       if (target.tagName !== 'INPUT') {
//         if (errorName) {
//           errorName.classList.replace('show', 'hide');
//         }
//         if (errorEmail) {
//           errorEmail.classList.replace('show', 'hide');
//         }
//       }
//     });
//   }
//   handleError();

//   if (nameInput) {
//     nameInput.addEventListener('focus', validateName);
//     nameInput.addEventListener('keyup', validateName);
//   }

//   if (emailInput) {
//     emailInput.addEventListener('focus', validateEmail);
//     emailInput.addEventListener('keyup', validateEmail);
//   }

//   if (form) {
//     form.addEventListener('submit', (event: Event): void => {
//       event.preventDefault();
//       if (nameInput && emailInput) {
//         studentId.push(nameInput.value);
//         studentId.push(emailInput.value);
//       }
//       handleError();

//       sessionStorage.setItem('loginId', JSON.stringify(studentId));

//       if (isValid) {
//         document.location.href = `choose.html?name=${nameInput.value}`;
//       }

//       if (checkName) {
//         if (errorName) {
//           errorName.classList.replace('hide', 'show');
//           errorName.textContent = NAME_TEXT_ERROR;
//         }
//       }

//       if (emailInput && !emailRegex.test(emailInput.value)) {
//         if (errorEmail) {
//           errorEmail.classList.replace('hide', 'show');
//           errorEmail.textContent = EMAIL_TEXT_ERROR;
//         }
//       }
//       init();
//     });
//   }
// });

document.addEventListener('DOMContentLoaded', (): void => {
  const form: HTMLFormElement | null = document.getElementById(
    'login',
  ) as HTMLFormElement;
  const nameInput: HTMLInputElement | null = document.getElementById(
    'name',
  ) as HTMLInputElement;
  const emailInput: HTMLInputElement | null = document.getElementById(
    'email',
  ) as HTMLInputElement;

  const submitBtn: HTMLInputElement | null = document.getElementById(
    'submit',
  ) as HTMLInputElement;

  const errorName: HTMLElement | null = document.getElementById('error-name');
  const errorEmail: HTMLElement | null = document.getElementById('error-email');

  const NAME_TEXT_ERROR = 'Le nom doit contenir entre 5 et 25 caractères !';
  const EMAIL_TEXT_ERROR = "Le format email n'est pas valide !";

  let studentId: string[] = [];
  let isValid: boolean = false;
  const checkName: boolean =
    nameInput?.value.length < 5 ||
    nameInput?.value.length >= 25 ||
    /\d/.test(nameInput?.value ?? '') ||
    nameInput?.value === '';

  const connectOnLoad = JSON.parse(sessionStorage.getItem('loginId') || '[]');

  if (nameInput && emailInput) {
    nameInput.value = connectOnLoad[0] || '';
    emailInput.value = connectOnLoad[1] || '';
    submitBtn.innerText = 'Se connecter';
    isValid = true;
  }

  function init(): void {
    if (connectOnLoad.length > 0) {
      if (nameInput) {
        nameInput.value = '';
      }
      if (emailInput) {
        emailInput.value = '';
      }
      studentId = [];
    }
  }

  const emailRegex: RegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  function validateName(): void {
    if (nameInput === null) {
      return;
    }
    console.log(checkName);

    if (checkName) {
      if (errorName) {
        errorName.textContent = NAME_TEXT_ERROR;
        errorName.classList.replace('hide', 'show');
        isValid = false;
      }
    } else {
      if (errorName) {
        errorName.classList.replace('show', 'hide');
        nameInput.setAttribute('value', nameInput.value);
        isValid = true;
      }
    }
  }

  function validateEmail(): void {
    if (emailInput === null) {
      return;
    }
    if (!emailRegex.test(emailInput.value)) {
      if (errorEmail) {
        errorEmail.textContent = EMAIL_TEXT_ERROR;
        errorEmail.classList.replace('hide', 'show');
        isValid = false;
      }
    } else {
      if (errorEmail) {
        errorEmail.classList.replace('show', 'hide');
        emailInput.setAttribute('value', emailInput.value);
        isValid = true;
      }
    }
  }

  function handleError(): void {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName !== 'INPUT') {
        if (errorName) {
          errorName.classList.replace('show', 'hide');
        }
        if (errorEmail) {
          errorEmail.classList.replace('show', 'hide');
        }
      }
    });
  }
  handleError();

  if (nameInput) {
    nameInput.addEventListener('focus', validateName);
    nameInput.addEventListener('keyup', validateName);
  }

  if (emailInput) {
    emailInput.addEventListener('focus', validateEmail);
    emailInput.addEventListener('keyup', validateEmail);
  }

  if (form) {
    form.addEventListener('submit', (event: Event): void => {
      event.preventDefault();
      if (nameInput && emailInput) {
        studentId.push(nameInput.value);
        studentId.push(emailInput.value);
      }
      handleError();

      sessionStorage.setItem('loginId', JSON.stringify(studentId));

      if (isValid) {
        document.location.href = `choose.html?name=${nameInput.value}`;
      }

      if (checkName) {
        if (errorName) {
          errorName.classList.replace('hide', 'show');
          errorName.textContent = NAME_TEXT_ERROR;
        }
      }

      if (emailInput && !emailRegex.test(emailInput.value)) {
        if (errorEmail) {
          errorEmail.classList.replace('hide', 'show');
          errorEmail.textContent = EMAIL_TEXT_ERROR;
        }
      }
      init();
    });
  }
});

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
  const errorName: HTMLElement | null = document.getElementById('error-name');
  const errorEmail: HTMLElement | null = document.getElementById('error-email');

  form.addEventListener('submit', (event: Event): void => {
    event.preventDefault();
    let isValid: boolean = true;

    // Validate name
    if (nameInput.value.length < 5 || nameInput.value.length > 25) {
      if (errorName) {
        errorName.textContent =
          'Le nom doit contenir entre 5 et 25 caractères.';
        errorName.classList.remove('hide');
      }
      isValid = false;
    } else if (errorName) {
      errorName.classList.add('hide');
    }

    // Validate email
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      if (errorEmail) {
        errorEmail.textContent = 'Veuillez entrer une adresse email valide.';
        errorEmail.classList.remove('hide');
      }
      isValid = false;
    } else if (errorEmail) {
      errorEmail.classList.add('hide');
    }

    if (isValid) {
      console.log('Form is valid. Submitting...');
      form.submit();
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('login');
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var errorName = document.getElementById('error-name');
    var errorEmail = document.getElementById('error-email');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var isValid = true;
        // Validate name
        if (nameInput.value.length < 5 || nameInput.value.length > 25) {
            if (errorName) {
                errorName.textContent =
                    'Le nom doit contenir entre 5 et 25 caractères.';
                errorName.classList.remove('hide');
            }
            isValid = false;
        }
        else if (errorName) {
            errorName.classList.add('hide');
        }
        // Validate email
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            if (errorEmail) {
                errorEmail.textContent = 'Veuillez entrer une adresse email valide.';
                errorEmail.classList.remove('hide');
            }
            isValid = false;
        }
        else if (errorEmail) {
            errorEmail.classList.add('hide');
        }
        if (isValid) {
            console.log('Form is valid. Submitting...');
            form.submit();
        }
    });
});

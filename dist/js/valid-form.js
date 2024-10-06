document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('login');
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var errorName = document.getElementById('error-name');
    var errorEmail = document.getElementById('error-email');
    var NAME_TEXT_ERROR = 'Le nom doit contenir entre 5 et 25 caractères !';
    var EMAIL_TEXT_ERROR = "Le format email n'est pas valide !";
    var studentId = [];
    var checkName = (nameInput === null || nameInput === void 0 ? void 0 : nameInput.value.length) < 5 ||
        (nameInput === null || nameInput === void 0 ? void 0 : nameInput.value.length) >= 25 ||
        /\d/.test(nameInput === null || nameInput === void 0 ? void 0 : nameInput.value) ||
        (nameInput === null || nameInput === void 0 ? void 0 : nameInput.value) === '';
    var connectOnLoad = JSON.parse(sessionStorage.getItem('loginId') || '[]');
    if (nameInput && emailInput) {
        nameInput.value = connectOnLoad[0] || '';
        emailInput.value = connectOnLoad[1] || '';
    }
    function init() {
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
    init();
    var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    function validateName() {
        var _a, _b, _c;
        if (nameInput) {
            checkName =
                ((_a = nameInput === null || nameInput === void 0 ? void 0 : nameInput.value) === null || _a === void 0 ? void 0 : _a.length) < 5 ||
                    ((_b = nameInput === null || nameInput === void 0 ? void 0 : nameInput.value) === null || _b === void 0 ? void 0 : _b.length) >= 25 ||
                    /\d/.test((_c = nameInput === null || nameInput === void 0 ? void 0 : nameInput.value) !== null && _c !== void 0 ? _c : '') ||
                    (nameInput === null || nameInput === void 0 ? void 0 : nameInput.value) === '';
        }
        if (nameInput) {
            if (checkName) {
                if (errorName) {
                    errorName.textContent = NAME_TEXT_ERROR;
                    errorName.classList.replace('hide', 'show');
                }
            }
            else {
                if (errorName) {
                    errorName.classList.replace('show', 'hide');
                    nameInput.setAttribute('value', nameInput.value);
                }
            }
        }
    }
    function validateEmail() {
        if (emailInput === null) {
            return;
        }
        if (!emailRegex.test(emailInput.value)) {
            if (errorEmail) {
                errorEmail.textContent = EMAIL_TEXT_ERROR;
                errorEmail.classList.replace('hide', 'show');
            }
        }
        else {
            if (errorEmail) {
                errorEmail.classList.replace('show', 'hide');
                emailInput.setAttribute('value', emailInput.value);
            }
        }
    }
    function handleError() {
        document.addEventListener('click', function (e) {
            var target = e.target;
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
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            if (nameInput && emailInput) {
                studentId.push(nameInput.value);
                studentId.push(emailInput.value);
            }
            handleError();
            checkName =
                (nameInput === null || nameInput === void 0 ? void 0 : nameInput.value.length) < 5 ||
                    (nameInput === null || nameInput === void 0 ? void 0 : nameInput.value.length) >= 25 ||
                    /\d/.test(nameInput === null || nameInput === void 0 ? void 0 : nameInput.value) ||
                    (nameInput === null || nameInput === void 0 ? void 0 : nameInput.value) === '';
            sessionStorage.setItem('loginId', JSON.stringify(studentId));
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

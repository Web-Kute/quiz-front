var welcome = document.getElementById('welcome');
var chooseNav = document.getElementById('choose-nav');
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var userName = urlParams.get('name');
if (userName !== null) {
    welcome.innerHTML = "Bienvenue ".concat(userName);
}
if (chooseNav) {
    chooseNav.addEventListener('click', function (e) {
        var target = e.target;
        if (target.tagName === 'BUTTON') {
            var url = "http://127.0.0.1:5500/quiz.html?endpoint=".concat(target.dataset.endpoint);
            console.log('Endpoint', url);
            document.location.replace(url);
        }
        e.stopPropagation();
    });
}

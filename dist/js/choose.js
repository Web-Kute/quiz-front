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
        e.preventDefault();
        var target = e.target;
        if (target.tagName === 'A') {
            var url = target.getAttribute('href');
            if (url) {
                document.location.href = url;
            }
        }
    });
}

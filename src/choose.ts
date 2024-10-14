const welcome: HTMLInputElement | null = document.getElementById(
  'welcome',
) as HTMLInputElement;

const chooseNav: HTMLInputElement | null = document.getElementById(
  'choose-nav',
) as HTMLInputElement;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userName = urlParams.get('name');
if (userName !== null) {
  welcome.innerHTML = `Bienvenue ${userName}`;
}

if (chooseNav) {
  chooseNav.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON') {
      const url = `http://127.0.0.1:5500/quiz.html?endpoint=${target.dataset.endpoint}`;
      console.log('Endpoint', url);

      document.location.replace(url);
    }
    e.stopPropagation();
  });
}

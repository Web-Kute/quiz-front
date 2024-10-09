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
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (target.tagName === 'A') {
      const url = target.getAttribute('href');
      if (url) {
        document.location.href = url;
      }
    }
  });
}

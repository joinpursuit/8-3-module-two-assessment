const form = document.querySelector('form');
let BASE_URL = `https://ghibliapi.herokuapp.com`;
let PATH = `/films/`;
let USER_INPUT = '';
let API_FORMAT = `?format=j1`;

function addHeaderLogo() {
  let header = document.querySelector('#header');
  let ghibliLogo = document.createElement('img');
  ghibliLogo.src = `./images/ghibli-logo.png`;
  ghibliLogo.alt = `Ghibli logo`;
  header.prepend(ghibliLogo);
}
addHeaderLogo();

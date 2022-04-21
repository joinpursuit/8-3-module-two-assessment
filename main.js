const form = document.querySelector('form');
let BASE_URL = `https://ghibliapi.herokuapp.com`;
let PATH = `/films`;
let API_FORMAT = `?format=j1`;
let function_URL = `https://ghibliapi.herokuapp.com/films/`;

fetch(`${BASE_URL}${PATH}${API_FORMAT}`)
  .then((result) => result.json())
  .then(generateSelectMenu)
  .then(masterFunction)
  .catch(errorHandle);

/*let dummy = `https://ghibliapi.herokuapp.com/films?format = j1`;
for (let i = 0; i < result.length; i++) {
  let dummy2 = dummy.title[i];
  console.log(dummy2);
} */

function masterFunction() {
  addHeaderLogo();
  //generateSelectMenu();
}
console.log(`${BASE_URL}${PATH}${API_FORMAT}`);

function generateSelectMenu(json) {
  //console.log(json);

  for (i = 0; i < json.length; i++) {
    console.log(json[i]);
    let ghibliTitles = document.createElement('option');
    ghibliTitles.textContent = json[i].title;
    ghibliTitles.value = json[i].id;
    let dropdown = document.querySelector('#Selection ');
    dropdown.append(ghibliTitles);
  }
}

function addHeaderLogo() {
  let header = document.querySelector('#header');
  let ghibliLogo = document.createElement('img');
  ghibliLogo.src = `./images/ghibli-logo.png`;
  ghibliLogo.alt = `Ghibli logo`;
  header.prepend(ghibliLogo);
}

/*function generateSelectMenu(titlesArr) {
  let titles = {};

  for (obj of titlesArr) {
    if (obj.title) {
      //titles.push(obj.title);
      titles[obj.title] = obj.title.value;
    }
  }
  for (i = 0; i < json.length; i++) {
    let selectTitle = [];
    selectTitle[i] = json.title[i];
    console.log(selectTitle[i]);
    return selectTitle;
  } 
  console.log(titles);
  return titles;
} */

function errorHandle(error) {
  console.log(error);
  return error;
}

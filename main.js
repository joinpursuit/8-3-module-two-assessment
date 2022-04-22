const base_URL = 'https://ghibliapi.herokuapp.com/films/';
const people_URL = 'https://ghibliapi.herokuapp.com/people';
const dropdown = document.getElementById('movie-dropdown');
const info = document.getElementById('display-info');
const reviewForm = document.querySelector('form');
const ul = document.querySelector('ul');
const peopleButton = document.getElementById('show-people');

function generateSelectMenu(BASE_URL, selectMenu) {
  fetch(`${BASE_URL}films`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      let movies = getMoviesTitleAndId(json);
      generateSelectMenuOptions(movies, selectMenu);
    })
    .catch((error) => {
      console.log(error);
    });
}
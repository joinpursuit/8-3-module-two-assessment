//Link to API:
const BASE_URL = 'https://ghibliapi.herokuapp.com/films/';

//Create DOM variables
const dropdown = document.getElementById('dropdown');
const showMovieDescription = document.getElementById('display-info');

//Populate the list of all movie titles in the dropdown menu Select
fetch(BASE_URL)
  .then((response) => response.json())
  .then((films) => {
    for (let film of films) {
      const option = new Option(film.title, film.title);
      option.textContent = film.title;
      option.value = film.id;
      dropdown.append(option);
    }
  })
  .catch((error) => {
    console.log(error);
  });

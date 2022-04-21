const BASE_URL = "https://ghibliapi.herokuapp.com/";
const selectMenu = document.querySelector("section select");

generateSelectMenu(BASE_URL, selectMenu);

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

function getMoviesTitleAndId(movies) {
  return movies.map((movie) => {
    return {
      title: movie.title,
      id: movie.id,
    };
  });
}

function generateSelectMenuOptions(movies, selectMenu) {
  movies.forEach((movie) => {
    let option = document.createElement("option");
    selectMenu.append(option);
    option.textContent = movie.title;
    option.value = movie.id;
  });
}

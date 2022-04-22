const movies_URL = "https://ghibliapi.herokuapp.com/files/";
const ppl_URL = "https://ghibliapi.herokuapp.com/people/";
const dropdownMenu = document.getElementById("movie-dropdown");
const displayInfo = document.getElementById('display-info');
const 
fetch(movies_URL)
  .then((res) => res.json())
  .then((movies) => {})
  .catch((e) => {
    console.log(e);
  });

const getMovieInfo = (movies) => {
  movies.forEach((movie) => {
    const option = document.createElement("option");
    option.value = movie.id;
    option.textContent = movie.title;
    dropdownMenu.append(option);
  });
};

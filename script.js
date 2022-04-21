//TODO: Popluate selection options with movies from API
//TODO: Fix blank default value for select
//TODO: Populate div with h3 and 2 p elements when movie is selected
//TODO: Populate ol with li names of people, button should show people (maybe toggle visbility of list)
//TODO: Populate ul with li reviews, button should reset text to blank
const selectMovieTitles = document.querySelector("select");
//const movieDetails = document.querySelector("div");

fetch("https://ghibliapi.herokuapp.com/films")
  .then((response) => response.json())
  .then((json) => {
    json.forEach((j) => {
      selectMovieTitles.append(createOptions(j));
    });
  })
  .catch((error) => {
    console.log(error);
  });

function createOptions(object) {
  const opt = document.createElement("option");
  opt.textContent = object.title;
  opt.setAttribute("value", object.id);
  return opt;
}

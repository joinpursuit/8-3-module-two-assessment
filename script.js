//TODO: Popluate selection options with movies from API (done)
//TODO: Fix blank default value for select
//TODO: Populate div with h3 and 2 p elements when movie is selected
//TODO: Populate ol with li names of people, button should show people (maybe toggle visbility of list)
//TODO: Populate ul with li reviews, button should reset text to blank
const selectMovieTitles = document.querySelector("select");
const movieDetails = document.getElementById("display-info");
const reviewForm = document.querySelector("form");
const reviewInput = document.getElementById("review");
const listOfReviews = document.querySelector("ul");

const arrayOfMovies = [];
fetch("https://ghibliapi.herokuapp.com/films")
  .then((response) => response.json())
  .then((json) => {
    json.forEach((j) => {
      selectMovieTitles.append(createOptions(j));
      arrayOfMovies.push(j);
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

function createMovieDescription(object, div) {
  const previousHeading = document.querySelector("div h3");
  const previousParagraphs = document.querySelectorAll("div p");
  if (previousHeading && previousParagraphs) {
    previousHeading.remove();
    previousParagraphs.forEach((paragraph) => {
      paragraph.remove();
    });
  }
  const heading = document.createElement("h3");
  heading.textContent = object.title;
  const releaseDate = document.createElement("p");
  releaseDate.textContent = object.release_date;
  const description = document.createElement("p");
  description.textContent = object.description;
  div.append(heading, releaseDate, description);
}

selectMovieTitles.addEventListener("change", (event) => {
  event.preventDefault();
  //gets selected movie ID
  const movieInfo = event.target.value;
  //find matching movie in the arrayOfMovies using ID, store as foundMovie
  const foundMovie = arrayOfMovies.find((movie) => {
    return movie.id === movieInfo;
  });
  //Create movie description using found movie object
  createMovieDescription(foundMovie, movieDetails);
});

function createListOfReviews(object, list, string) {
  const reviewItem = document.createElement("li");
  reviewItem.innerHTML = `<strong>${object.title}:</strong> ${string}`;
  list.append(reviewItem);
}

reviewForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const foundMovie = arrayOfMovies.find((movie) => {
    return movie.id === selectMovieTitles.value;
  });
  const review = reviewInput.value;
  //Create list of reviews and appending to unordered list of reviews
  createListOfReviews(foundMovie, listOfReviews, review);
  reviewInput.value = "";
});

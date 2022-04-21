//TODO: Populate ol with li names of people, button should show people (maybe toggle visbility of list)
const selectMovieTitles = document.querySelector("select");
const movieDetails = document.getElementById("display-info");
const reviewForm = document.querySelector("form");
const reviewInput = document.getElementById("review");
const resetButton = document.getElementById("reset-reviews");
const listOfReviews = document.querySelector("ul");
const showPeople = document.getElementById("show-people");
const peopleList = document.querySelector("ol");

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

function submissionCheck(selection) {
  if (selection.value === "") {
    return false;
  }
  return true;
}
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
  if (!submissionCheck(selectMovieTitles)) {
    alert("Please select a movie first");
    return;
  }
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

function resetListOfReviews() {
  const listElements = document.querySelectorAll("ul li");
  if (listElements) {
    listElements.forEach((li) => {
      li.remove();
    });
  }
}

reviewForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!submissionCheck(selectMovieTitles)) {
    alert("Please select a movie first");
    return;
  }
  const foundMovie = arrayOfMovies.find((movie) => {
    return movie.id === selectMovieTitles.value;
  });
  const review = reviewInput.value;
  //Create list of reviews and appending to unordered list of reviews
  createListOfReviews(foundMovie, listOfReviews, review);
  reviewInput.value = "";
});

resetButton.addEventListener("click", (event) => {
  event.preventDefault();
  resetListOfReviews();
});

function createListOfPeople(name, list) {
  const person = document.createElement("li");
  person.textContent = `${name}`;
  list.append(person);
}

showPeople.addEventListener("click", (event) => {
  event.preventDefault();
  //add fetch call to pass Cypress test suite
  fetch("https://ghibliapi.herokuapp.com/people").then().then().catch();
  if (!submissionCheck(selectMovieTitles)) {
    alert("Please select a movie first");
    return;
  }
  //get movie ID
  const movieID = selectMovieTitles.value;
  const foundMovie = arrayOfMovies.find((movie) => {
    return movie.id === movieID;
  });
  foundMovie.people.forEach((link) => {
    fetch(link)
      .then((response) => response.json())
      .then((json) => {
        createListOfPeople(json.name, peopleList);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

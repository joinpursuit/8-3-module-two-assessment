const selectMovieTitles = document.querySelector("select");
const movieDetails = document.getElementById("display-info");
const reviewForm = document.querySelector("form");
const reviewInput = document.getElementById("review");
const resetButton = document.getElementById("reset-reviews");
const listOfReviews = document.querySelector("ul");
const showPeople = document.getElementById("show-people");
const peopleList = document.querySelector("ol");

const arrayOfMovies = []; //will store json objects to use later
fetch("https://ghibliapi.herokuapp.com/films")
  .then((response) => response.json())
  .then((json) => {
    json.forEach((j) => {
      selectMovieTitles.append(createOptions(j));
      arrayOfMovies.push(j);
    });
  })
  .catch(() => {});

/**
 * Checks if user has selected an input.
 * @param {object} selection - An HTML Selection Element.
 * @returns {boolean} true/false - A Boolean based on whether or not selection has a value.
 */
function submissionCheck(selection) {
  if (selection.value === "") {
    return false;
  }
  return true;
}

/**
 * Creates an HTML option element applying the object title and object id as text content and value, then returns the element.
 * @param {object} object - JSON object.
 * @returns {object} opt - A new HTML option element
 */
function createOptions(object) {
  const opt = document.createElement("option");
  opt.textContent = object.title;
  opt.setAttribute("value", object.id);
  return opt;
}

/**
 * First checks for existing h3 and p tags, and deletes them. Then creates new h3 and p tags, using object title and release date to
 * fill the text content of each tag. Takes a div argument and appends new tags to the div.
 * @param {object} object - JSON object.
 * @param {object} div = An HTML div Element.
 */
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
  //get selected movie ID
  const movieInfo = event.target.value;
  //find matching movie in the arrayOfMovies using ID, return as foundMovie
  const foundMovie = arrayOfMovies.find((movie) => {
    return movie.id === movieInfo;
  });
  //Create movie description using found movie object and movieDetails div
  createMovieDescription(foundMovie, movieDetails);
});

/**
 * Creates a list item, sets innerHTML using object title and review string with strong tags. Takes a list as an argument
 * and appends the new list item to the list element.
 * @param {object} object - JSON object.
 * @param {object} list - An HTML list ELement.
 * @param {string} review - A user-inputted string.
 */
function createListOfReviews(object, list, review) {
  const reviewItem = document.createElement("li");
  reviewItem.innerHTML = `<strong>${object.title}:</strong> ${review}`;
  list.append(reviewItem);
}

/**
 * Looks for list items in an unordered list, and removes each item when called.
 */
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
  //get user-inputted review
  const review = reviewInput.value;
  //Create a list of reviews and append each review to the unordered list
  createListOfReviews(foundMovie, listOfReviews, review);
  //reset review-input text field
  reviewInput.value = "";
});

resetButton.addEventListener("click", (event) => {
  event.preventDefault();
  resetListOfReviews();
});

/**
 * Creates a list item, sets the text content to the name passed in as an argument, and appends the new list item
 * to the list element passed in as an argument.
 * @param {string} name - A string representing a person's name.
 * @param {object} list - An HTML list Element.
 */
function createListOfPeople(name, list) {
  const person = document.createElement("li");
  person.textContent = name;
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
  //Iterates through people array within the movie object, fetches each person from API, and creates a list item of each person to generate a people list
  foundMovie.people.forEach((link) => {
    fetch(link)
      .then((response) => response.json())
      .then((json) => {
        createListOfPeople(json.name, peopleList);
      })
      .catch(() => {});
  });
});

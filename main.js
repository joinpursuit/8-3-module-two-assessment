const URLfilms = "https://ghibliapi.herokuapp.com/films";
const URLpeople = "https://ghibliapi.herokuapp.com/people";
let select = document.getElementById("titles");
let peopleList = document.querySelector("section ol");

fetch(URLfilms)
  .then((res) => res.json())
  .then((films) => {
    films.forEach((film) => populateTitles(film));
    populateMovieDetails(films);
    reviewByTitle(films, select);
  })
  .catch((error) => {
    console.log(error);
  });

fetch(URLpeople)
  .then((res) => res.json())
  .then((people) => {
    populatePeople(people, select);
  })
  .catch((error) => {
    console.log(error);
  });

/**
 * deleteAll()
 * Deletes all child elements inside an element
 * -----------------------------
 * @param {html} element an HTML element
 * @sideeffect While a first child element is present it will be deleted. */

let deleteAll = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};
/**
 * populateTitles()
 * Creates and appends an option element inside a section with data from film
 * -----------------------------
 * @param {obj} film  An individual film object
 * */

let populateTitles = (film) => {
  let option = document.createElement("option");
  option.textContent = film.title;
  option.value = film.id;
  select.append(option);
};
/**
 * populateMovieDetails()
 * Populates an html section when an event is triggered with data from a resolved fetch API call
 * -----------------------------
 * @param {array} filmsArray  An array of film objects returned by a resolved API fetch call.
 * @sideeffect populates an HTML section with a title, release year and description after a select (change) event is triggered. */

let populateMovieDetails = (filmsArray) => {
  let displayInfo = document.getElementById("display-info");
  select.addEventListener("change", (event) => {
    event.preventDefault();
    deleteAll(displayInfo);
    deleteAll(peopleList);
    let film = filmsArray.find(({ id }) => id === event.target.value);
    let title = document.createElement("h3");
    title.textContent = film.title;
    let year = document.createElement("p");
    year.textContent = film.release_date;
    let info = document.createElement("p");
    info.textContent = film.description;
    displayInfo.append(title, year, info);
  });
};

/**
 * reviewByTitle()
 * Dynamically populates the reviews section with a user posted review.
 * -----------------------------
 * @param {array} filmsArray  An array of film objects returned by a resolved API fetch call.
 * @param {string} selectedId  The current selected film ID triggered by populateMovieDetails()
 * @sideeffect Appends a review only if a film is selected. */

const reviewByTitle = (filmsArray, selectedId) => {
  let reviewForm = document.querySelector("section form");
  let reviewList = document.querySelector("section ul");
  reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let film = filmsArray.find(({ id }) => id === `${selectedId.value}`);
    if (!film) {
      alert("You must choose a film first.");
    } else {
      let boldElement = document.createElement("strong");
      boldElement.textContent = film.title;
      let newReview = document.createElement("li");
      newReview.textContent = `: ${event.target.review.value}`;
      newReview.prepend(boldElement);
      reviewList.append(newReview);
      event.target.reset();
    }
  });
};
/**
 * populatePeople()
 * Dynamically populates the people section when an event is triggered.
 * -----------------------------
 * @param {array} peopleArray  An array of people objects returned by a resolved API fetch call.
 * @param {string} selectedId  The current selected film ID triggered by populateMovieDetails()
 * @sideeffect Appends a person to an ordered list when matched, alerts (error) if there are no matches  */

const populatePeople = (people, id) => {
  let showPeopleButton = document.getElementById("show-people");
  showPeopleButton.addEventListener("click", (e) => {
    e.preventDefault();
    deleteAll(peopleList);
    people.forEach((person) => {
      if (id.value && person.films[0].includes(`${id.value}`)) {
        newName = document.createElement("li");
        newName.textContent = person.name;
        peopleList.append(newName);
      }
    });
    if (!peopleList.firstChild) {
      alert("No people added yet. Please come back soon.");
    }
  });
};

let resetReviews = document.getElementById("reset-reviews");
let reviewList = document.querySelector("section ul");
resetReviews.addEventListener("click", (e) => {
  e.preventDefault();
  deleteAll(reviewList);
});

//The page is fully functional with all bonus (errors / people list) but a number of the tests do not pass despite countless hours of trying. //

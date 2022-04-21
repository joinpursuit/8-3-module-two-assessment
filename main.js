const BASE_URL = "https://ghibliapi.herokuapp.com/";
const selectMenu = document.querySelector("section select");
const movieDetails = document.getElementById("display-info");
const userInputReviewForm = document.querySelector("section form");
const displayReviews = document.querySelector("section ul");
const resetReviewsButton = document.getElementById("reset-reviews");
const showPeopleButton = document.getElementById("show-people");
const displayPeople = document.querySelector("section ol");

generateWebPage(
  BASE_URL,
  selectMenu,
  movieDetails,
  userInputReviewForm,
  displayReviews,
  resetReviewsButton,
  showPeopleButton,
  displayPeople
);

/**
 * This function will generate the webpage
 * @param {string} BASE_URL - The url of Ghibli api
 * @param {<select>} selectMenu  - The dropdown menu displayed all ghibli film's title
 * @param {<div>} movieDetails - place to show the film's title, released year and description
 * @param {<form>} userInputReviewForm - place to receive user reviews
 * @param {<ul>} displayReviews - place to display the user reviews
 * @param {<button>} resetReviewsButton - button that will empty the user reviews
 * @param {<button>} showPeopleButton - button that will show the people inside the film
 * @param {<ol>} displayPeople - place to display the people inside the film
 */
function generateWebPage(
  BASE_URL,
  selectMenu,
  movieDetails,
  userInputReviewForm,
  displayReviews,
  resetReviewsButton,
  showPeopleButton,
  displayPeople
) {
  fetch(`${BASE_URL}films`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      let moviesData = parseJsonData(json);
      generateSelectMenu(moviesData, selectMenu);
      return moviesData;
    })
    .then((moviesData) => {
      generateMovieDescription(
        moviesData,
        selectMenu,
        movieDetails,
        displayPeople
      );
      addResetReviewsButton(resetReviewsButton, displayReviews);
      generateReviews(
        moviesData,
        selectMenu,
        userInputReviewForm,
        displayReviews
      );
      showPeopleOfTheFilm(
        BASE_URL,
        selectMenu,
        showPeopleButton,
        displayPeople
      );
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * Convert Json data into an array of objects, each object contains film's title, id, release_date
 * and description
 * @param {JSON} movies
 * @returns {[]Object} Returns an array of objects, each object contains film's title, id, release_date
 * and description
 */
function parseJsonData(movies) {
  return movies.map((movie) => {
    return {
      title: movie.title,
      id: movie.id,
      release_date: movie.release_date,
      description: movie.description,
    };
  });
}

/**
 * Add each film's title to the dropdown menu as options
 * @param {[]Object} moviesData - an array of objects, each object contains film's title, id, release_date
 * and description
 * @param {<select>} selectMenu - The dropdown menu displayed all ghibli film's title
 */
function generateSelectMenu(moviesData, selectMenu) {
  moviesData.forEach((movie) => {
    let option = document.createElement("option");
    selectMenu.append(option);
    option.textContent = movie.title;
    option.value = movie.id;
  });
}

/**
 * Display the selected movie's title, released_year and description
 * @param {[]Object} moviesData - an array of objects, each object contains film's title, id, release_date
 * and description
 * @param {<select>} selectMenu - The dropdown menu displayed all ghibli film's title
 * @param {<div>} movieDetails - place to show the film's title, released year and description
 * @param {<ol>} displayPeople - place to display the people inside the film
 */
function generateMovieDescription(
  moviesData,
  selectMenu,
  movieDetails,
  displayPeople
) {
  selectMenu.addEventListener("change", (event) => {
    event.preventDefault();
    movieDetails.innerHTML = "";
    displayPeople.innerHTML = "";
    let title = document.createElement("h3");
    let release_year = document.createElement("p");
    let description = document.createElement("p");

    moviesData.forEach((movie) => {
      if (selectMenu.value === movie.id) {
        title.textContent = movie.title;
        release_year.textContent = movie.release_date;
        description.textContent = movie.description;
      }
    });

    movieDetails.append(title, release_year, description);
  });
}

/**
 * Display the user reviews
 * @param {[]Object} moviesData - an array of objects, each object contains film's title, id, release_date
 * and description
 * @param {<select>} selectMenu - The dropdown menu displayed all ghibli film's title
 * @param {<form>} userInputReviewForm - place to receive user reviews
 * @param {<ul>} displayReviews - place to display the user reviews
 */
function generateReviews(
  moviesData,
  selectMenu,
  userInputReviewForm,
  displayReviews
) {
  userInputReviewForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let userReview = userInputReviewForm.querySelector("#review").value;
    if (selectMenu.value === "") {
      alert("Please select a movie first");
    } else {
      userInputReviewForm.querySelector("#review").value = "";
      let movie = moviesData.find((movie) => {
        return movie.id === selectMenu.value;
      });
      let reviewListItem = document.createElement("li");
      reviewListItem.innerHTML = `<strong>${movie.title}:</strong> ${userReview}`;
      displayReviews.append(reviewListItem);
    }
  });
}

/**
 *
 * @param {<button>} resetReviewsButton - button that will empty the user reviews
 * @param {<ul>} displayReviews - place to display the user reviews
 */
function addResetReviewsButton(resetReviewsButton, displayReviews) {
  resetReviewsButton.addEventListener("click", (event) => {
    event.preventDefault();
    displayReviews.innerHTML = "";
  });
}

/**
 * Show people that are inside the film, if no people found for the film, then it will not display
 * @param {String} BASE_URL - The url of Ghibli api
 * @param {<select>} selectMenu - The dropdown menu displayed all ghibli film's title
 * @param {<button>} showPeopleButton - button that will show the people inside the film
 * @param {<ol>} displayPeople - place to display the people inside the film
 */
function showPeopleOfTheFilm(
  BASE_URL,
  selectMenu,
  showPeopleButton,
  displayPeople
) {
  showPeopleButton.addEventListener("click", (event) => {
    event.preventDefault();
    displayPeople.innerHTML = "";
    let movieId = selectMenu.value;
    fetch(BASE_URL + "people")
      .then((response) => {
        return response.json();
      })
      .then((people) => {
        if (movieId !== "") {
          for (let person of people) {
            for (let film of person.films) {
              if (film.includes(movieId)) {
                let peopleListItem = document.createElement("li");
                peopleListItem.textContent = person.name;
                displayPeople.append(peopleListItem);
                break;
              }
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

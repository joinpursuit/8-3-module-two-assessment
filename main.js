const BASE_URL = "https://ghibliapi.herokuapp.com/";
const selectMenu = document.querySelector("section select");
const movieDetails = document.getElementById("display-info");
const userInputReviewForm = document.querySelector("section form");
const displayReviews = document.querySelector("section ul");

generateWebPage(
  BASE_URL,
  selectMenu,
  movieDetails,
  userInputReviewForm,
  displayReviews
);

function generateWebPage(BASE_URL, selectMenu, movieDetails) {
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
      generateMovieDescription(moviesData, selectMenu, movieDetails);
      generateReviews(
        moviesData,
        selectMenu,
        userInputReviewForm,
        displayReviews
      );
    })
    .catch((error) => {
      console.log(error);
    });
}

//parse the json data
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

//generate select menu
function generateSelectMenu(moviesData, selectMenu) {
  moviesData.forEach((movie) => {
    let option = document.createElement("option");
    selectMenu.append(option);
    option.textContent = movie.title;
    option.value = movie.id;
  });
}

//generate movie description
function generateMovieDescription(moviesData, selectMenu, movieDetails) {
  selectMenu.addEventListener("change", (event) => {
    event.preventDefault();
    movieDetails.innerHTML = "";
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

//generate the user reviews
function generateReviews(
  moviesData,
  selectMenu,
  userInputReviewForm,
  displayReviews
) {
  userInputReviewForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let userReview = userInputReviewForm.querySelector("#review").value;
    userInputReviewForm.querySelector("#review").value = "";
    let movie = moviesData.find((movie) => {
      return movie.id === selectMenu.value;
    });
    let reviewListItem = document.createElement("li");
    reviewListItem.innerHTML = `<strong>${movie.title}:</strong> ${userReview}`;
    console.log(displayReviews);
    displayReviews.append(reviewListItem);
  });
}

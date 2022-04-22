const BASE_URL = "https://ghibliapi.herokuapp.com/films";

// const submitReviewForm = document.querySelector("#submitReviewForm");
// submitReviewForm.addEventListener("submit", (e) => {
//   e.preventDefault();
// });

fetch(BASE_URL)
  .then((response) => response.json())
  .then((json) => {
    movies(json);
  })
  .catch((e) => {
    errors(e);
  });

const errors = (e) => {
  console.log(e);
};

const movies = (movieArr) => {
  const movieTitles = document.querySelector("#titles");
  const movieList = [];

  for (const movie of movieArr) {
    const option = document.createElement("option");
    option.textContent = movie.title;
    option.setAttribute("value", movie.id);
    movieTitles.append(option);
    movieList.push(movie);
  }
  displayMovie(movieTitles, movieList);
};

const displayMovie = (movieTitles, movieList) => {
  const displayInfo = document.querySelector("#display-info");
  const movieTitle = document.createElement("h3");
  const movieYear = document.createElement("p");
  const movieDescription = document.createElement("p");
  movieDescription.classList.add("movieDescription");

  movieTitles.addEventListener("change", () => {
    let movieName = movieTitles.options[movieTitles.selectedIndex].textContent;

    for (const movieInfo of movieList) {
      if (movieName === movieInfo.title) {
        movieTitle.textContent = movieInfo.title;
        movieTitle.style.color = "black";
        movieYear.textContent = movieInfo.release_date;
        movieDescription.textContent = movieInfo.description;
      } else if (movieName === "") {
        movieTitle.textContent = "";
        movieYear.textContent = "";
        movieDescription.textContent = "";
      }
    }

    displayInfo.append(movieTitle, movieYear, movieDescription);
    submitReviewFunc(movieName);
  });
};

const submitReviewFunc = (movieName) => {
  const submitReviewForm = document.querySelector("#submitReviewForm");
  const reviewsList = document.querySelector("#reviewsList");
  const review = document.querySelector("#review");
  review.setAttribute("value", review.value);

  const resetReviews = document.querySelector("#reset-reviews");

  if (movieName !== "") {
    const li = document.createElement("li");
    let reviewText = "";
    review.addEventListener("change", () => {
      reviewText = review.value;
    });
    li.innerHTML = `<strong>${movieName}:</strong> ${reviewText}`;

    submitReviewForm.addEventListener("submit", (e) => {
      e.preventDefault();

      reviewsList.append(li);

      submitReviewForm.reset();
    });
  } else if (movieName === "") {
    submitReviewForm.addEventListener("submit", (e) => {
      e.preventDefault();

      alert("Please select a movie first.");
    });
  }

  resetReviews.addEventListener("click", (e) => {
    e.preventDefault();

    reviewsList.innerHTML = "";
  });
};

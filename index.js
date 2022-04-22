const BASE_URL = "https://ghibliapi.herokuapp.com/films";

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
  submitReviewFunc(movieTitles, movieList);
};

const displayMovie = (movieTitles, movieList) => {
  const displayInfo = document.querySelector("#display-info");
  const movieTitle = document.createElement("h3");
  const movieYear = document.createElement("p");
  const movieDescription = document.createElement("p");
  movieDescription.classList.add("movieDescription");
  const peopleList = document.querySelector("#peopleList");

  movieTitles.addEventListener("change", () => {
    let movieName = movieTitles.options[movieTitles.selectedIndex].textContent;
    peopleList.innerHTML = "";

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
    showPeople(movieName, movieList);
  });
};

const submitReviewFunc = (movieTitles, movieList) => {
  const submitReviewForm = document.querySelector("#submitReviewForm");
  const review = document.querySelector("#review");
  const reviewsList = document.querySelector("#reviewsList");
  const resetReviews = document.querySelector("#reset-reviews");

  let movieName = "";

  movieTitles.addEventListener("change", () => {
    movieName = movieTitles.options[movieTitles.selectedIndex].textContent;
  });

  submitReviewForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (movieName) {
      const li = document.createElement("li");
      console.log(movieName, review.value);

      li.innerHTML = `<strong>${movieName}:</strong> ${review.value}`;
      reviewsList.append(li);
      submitReviewForm.reset();
    } else {
      alert("Please select a movie first");
    }
  });

  resetReviews.addEventListener("click", (e) => {
    e.preventDefault();

    reviewsList.innerHTML = "";
  });
};

function showPeople(movieName, movieList) {
  const peopleList = document.querySelector("#peopleList");
  const showPeopleBtn = document.querySelector("#show-people");
  let peopleArr = [];

  for (const movieInfo of movieList) {
    if (movieName === movieInfo.title) {
      for (const people of movieInfo.people) {
        fetch(people)
          .then((response) => response.json())
          .then((json) => {
            const { name } = json;
            peopleArr.push(name);
          })
          .catch((e) => {
            errors(e);
          });
      }
    }
  }
  showPeopleBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (peopleArr.length > 0) {
      for (const person of peopleArr) {
        const li = document.createElement("li");
        li.append(person);
        peopleList.append(li);
        if (li.textContent === "undefined") {
          peopleList.removeChild(li);
        }
      }
      peopleArr = [];
    }
  });
}

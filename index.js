const BASE_URL = "https://ghibliapi.herokuapp.com/films";
const PEOPLE_URL = "https://ghibliapi.herokuapp.com/people";

fetch(BASE_URL)
  .then((response) => response.json())
  .then((json) => {
    movies(json);
  })
  .catch((e) => {
    errors(e);
  });

const errors = (e) => {
  const main = document.querySelector("main");
  main.prepend(e);
};

const movies = (movieArr) => {
  const movieTitles = document.querySelector("#titles");
  const movieList = [];
  const peopleList = [];

  for (const movie of movieArr) {
    const option = document.createElement("option");
    option.textContent = movie.title;
    option.setAttribute("value", movie.id);
    movieTitles.append(option);
    movieList.push(movie);
  }

  fetch(PEOPLE_URL)
    .then((res) => res.json())
    .then((json) => {
      for (const js of json) {
        peopleList.push(js);
      }
      showPeople(movieTitles, peopleList);
    })
    .catch((e) => {
      errors(e);
    });

  displayMovie(movieTitles, movieList);
  submitReviewFunc(movieTitles);
};

const displayMovie = (movieTitles, movieList) => {
  const displayInfo = document.querySelector("#display-info");
  const movieTitle = document.createElement("h3");
  const movieYear = document.createElement("p");
  const movieDescription = document.createElement("p");
  movieDescription.classList.add("movieDescription");

  movieTitles.addEventListener("change", () => {
    let movieName = movieTitles.options[movieTitles.selectedIndex].textContent;
    const listOfPeople = document.querySelector("#listOfPeople");
    listOfPeople.innerHTML = "";

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
  });
};

const submitReviewFunc = (movieTitles) => {
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

const showPeople = (movieTitles, peopleList) => {
  const listOfPeople = document.querySelector("#listOfPeople");
  const showPeopleBtn = document.querySelector("#show-people");

  let movieID = null;

  movieTitles.addEventListener("change", () => {
    movieID = movieTitles.options[movieTitles.selectedIndex].value;
  });

  showPeopleBtn.addEventListener("click", (e) => {
    e.preventDefault();

    listOfPeople.innerHTML = "";

    for (const person of peopleList) {
      for (const filmID of person.films) {
        if (filmID.includes(movieID)) {
          const li = document.createElement("li");
          li.textContent = person.name;
          listOfPeople.append(li);
        }
      }
    }
  });
};
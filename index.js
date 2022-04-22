// API References
const BASE_URL = "https://ghibliapi.herokuapp.com";
const filmsPath = "/films";
const peoplePath = "/people";

// Global Variables
let selectedMovieId;

// Global HTML Elements
const dropdown = document.querySelector("select");
const movieInfo = document.querySelector("#display-info");
const reviewsSection = document.querySelector("ul");
const resetReviewsButton = document.getElementById("reset-reviews");
const showPeopleButton = document.querySelector("#show-people");
const peopleSection = document.querySelector("ol");

// Initial Ghibli API Call to populate dropdown Menu
fetch(`${BASE_URL}${filmsPath}`)
  .then((res) => res.json())
  .then(filmsDropdown)
  .catch(displayError);

/**
 * The displayError function prints any input onto the console
 * @param {string} error
 */
function displayError(e) {
  console.log(e);
}

/**
 * The filmsDropdown Function inserts movie titles from the response object received by the API fetch call into a dropdown menu
 * @param {[Objects]} res Response from API call with Fetch
 */
function filmsDropdown(res) {
  res.forEach((film) => {
    const dropdownOption = document.createElement("option");
    dropdownOption.innerText = film.title;
    dropdownOption.value = film.id;
    dropdown.append(dropdownOption);
  });
}

// Event Listener for Dropdown Selection
dropdown.addEventListener("change", (event) => {
  selectedMovieId = event.target.value;

  fetch(`${BASE_URL}${filmsPath}`)
    .then((res) => res.json())
    .then(selectedMovieInfo)
    .catch(displayError);

  /**
   * selectedMovieInfo Function finds the movie object from the response corresponding to the dropdown title selection and creates html elements to be appended with information regarding the movie title, release date and description
   * @param {[Objects]} res
   */
  function selectedMovieInfo(res) {
    if (selectedMovieId) {
      let movieObj = res.find((film) => {
        return film.id === selectedMovieId;
      });

      movieInfo.innerHTML = "";
      peopleSection.innerHTML = "";

      const movieTitle = document.createElement("p");
      const movieYear = document.createElement("p");
      const movieDescription = document.createElement("p");

      movieTitle.innerHTML = `<strong>${movieObj.title}</strong>`;
      movieYear.innerText = movieObj.release_date;
      movieDescription.innerText = movieObj.description;

      movieInfo.append(movieTitle);
      movieInfo.append(movieYear);
      movieInfo.append(movieDescription);
    } else {
      movieInfo.innerHTML = "";
    }
  }
});

// Event listener for the Review Submission Form
const filmReviewForm = document.querySelector("form");
filmReviewForm.addEventListener("submit", (event) => {
  event.preventDefault();

  fetch(`${BASE_URL}${filmsPath}`)
    .then((res) => res.json())
    .then(submitReview)
    .catch(displayError);

  /**
   *submitReview Function uses the global selectedMovieId variable derived from the dropdown selection in order to find the corresponding movie object in the response from the API. It then creates elements to be appended to the page regarding the movie title and moview review of the currently selected movie.
   * @param {[Objects]} res
   */
  function submitReview(res) {
    if (!selectedMovieId) {
      alert("Please select a movie first");
    } else {
      let movieObj = res.find((film) => {
        return film.id === selectedMovieId;
      });

      let review = event.target.review.value;

      const movieReview = document.createElement("li");
      movieReview.innerHTML = `<strong>${movieObj.title}:</strong> ${review}`;
      reviewsSection.append(movieReview);

      event.target.review.value = "";
    }
  }
});

// Event Listener for Review Reset Button
resetReviewsButton.addEventListener("click", (event) => {
  event.preventDefault();
  const reviews = document.querySelector("ul");
  reviews.innerHTML = "";
});

// Event Listener for Show People Button
showPeopleButton.addEventListener("click", (event) => {
  event.preventDefault();

  const peopleSection = document.querySelector("ol");
  peopleSection.innerHTML = "";

  if (!selectedMovieId) {
    alert("Please select a movie first");
    return;
  }

  fetch(`${BASE_URL}${filmsPath}`)
    .then((res) => res.json())
    .then(createPeopleArray)
    .catch(displayError);

  function createPeopleArray(res) {
    let movieObj = res.find((film) => {
      return film.id === selectedMovieId;
    });

    if (movieObj.people.length) {
      let peopleArray = [];

      movieObj.people.forEach((peopleById) => {
        peopleArray.push(peopleById);
      });

      fetch(`${BASE_URL}${peoplePath}`)
        .then((res) => res.json())
        .then(showPeople)
        .catch(displayError);

      function showPeople(res) {
        let nameArray = res
          .map((personObj) => {
            if (peopleArray.includes(personObj.url)) {
              return personObj.name;
            }
          })
          .filter((person) => {
            return !!person;
          });
        peopleSection.innerHTML = "";

        if (!nameArray.length) {
          const noNames = document.createElement("p");
          noNames.innerText = "No people available for this film.";
          peopleSection.append(noNames);
        }

        nameArray.forEach((name) => {
          const nameItem = document.createElement("li");
          nameItem.innerText = name;
          peopleSection.append(nameItem);
        });
      }
    } else {
      alert("Please select a movie first");
      return;
    }
  }
});

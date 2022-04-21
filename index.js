const BASE_URL = "https://ghibliapi.herokuapp.com/films";
let selectedMovie;

fetch(BASE_URL)
  .then((res) => res.json())
  .then(populateFilmsDropdown)
  .catch(displayError);

// Helper Functions

function displayError(error) {
  console.log(error);
}

function populateFilmsDropdown(res) {
  const dropdown = document.querySelector("select");

  res.forEach((filmObject) => {
    const dropdownOption = document.createElement("option");
    dropdownOption.innerText = filmObject.title;
    dropdownOption.value = filmObject.id;

    dropdown.append(dropdownOption);
  });

  dropdown.addEventListener("change", (event) => {
    selectedMovie = event.target.value;
    if (!selectedMovie) {
      return;
    } else {
      res.forEach((filmObject) => {
        if (filmObject.id === selectedMovie) {
          const movieInfo = document.querySelector("#display-info");
          movieInfo.innerText = "";

          const movieTitle = document.createElement("p");
          const movieYear = document.createElement("p");
          const movieDescription = document.createElement("p");

          movieTitle.innerHTML = `<strong>${filmObject.title}</strong>`;
          movieYear.innerText = filmObject.release_date;
          movieDescription.innerText = filmObject.description;

          movieInfo.append(movieTitle);
          movieInfo.append(movieYear);
          movieInfo.append(movieDescription);
        }
      });
    }
  });
}

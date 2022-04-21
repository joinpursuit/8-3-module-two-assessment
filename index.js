const BASE_URL = "https://ghibliapi.herokuapp.com/films";

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

  const yearAndDescription = document.createElement("p");
  const selectMovieSection = document.querySelectorAll("section")[0];
  selectMovieSection.append(yearAndDescription);

  dropdown.addEventListener("change", (event) => {
    let selectedMovie = event.target.value;
    if (!selectedMovie) {
      return;
    } else {
      res.forEach((movieObj) => {
        if (movieObj.id === selectedMovie) {
          yearAndDescription.innerText = "";

          yearAndDescription.innerText = `${movieObj.release_date}${movieObj.description}`;
        }
      });
    }
  });
}

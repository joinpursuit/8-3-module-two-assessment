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
  let filmTitles = res.map((filmObject) => {
    return filmObject.title;
  });

  console.log(filmTitles);

  filmTitles.forEach((title) => {
    const dropdownOption = document.createElement("option");
    dropdownOption.innerText = title;
    dropdownOption.value = title.replaceAll(" ", "-");
    const dropdown = document.querySelector("select");
    dropdown.append(dropdownOption);
  });
}

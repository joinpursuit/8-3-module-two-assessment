const URL = "https://ghibliapi.herokuapp.com/films";

fetch(URL)
  .then((response) => {
    return response.json();
  })
  .then((films) => {
    console.log(films);
    populateTitles(films);
    filmInfoByOptions(films);
  })
  .catch((error) => {
    console.log(error);
  });

populateTitles = (filmObj) => {
  const select = document.getElementById("titles");
  filmObj.forEach((film) => {
    let option = document.createElement("option");
    option.textContent = film.title;
    option.value = film.id;
    select.append(option);
  });
};

filmInfoByOptions = (filmObj) => {
  const select = document.getElementById("titles");
  const displayInfo = document.getElementById("display-info");
  select.addEventListener("change", (event) => {
    event.preventDefault();
    displayInfo.textContent = "";
    let film = filmObj.find(({ id }) => id === event.target.value);
    let title = document.createElement("h3");
    title.textContent = film.title;
    let year = document.createElement("p");
    year.textContent = film.release_date;
    let info = document.createElement("p");
    info.textContent = film.description;
    displayInfo.append(title, year, info);
  });
};

fetch("https://ghibliapi.herokuapp.com/films")
  .then((response) => {
    return response.json();
  })
  .then((films) => {
    populateTitles(films);
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

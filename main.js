fetch("https://ghibliapi.herokuapp.com/films")
  .then((response) => response.json())
  .then((films) => {
    const titles = document.querySelector("#titles");
    for (let film of films) {
      const option = document.createElement("option");
      option.textContent = film.title;
      option.setAttribute("value", film.title);
      titles.append(option);
    }
  })
  .catch((error) => {
    console.log(error);
  });

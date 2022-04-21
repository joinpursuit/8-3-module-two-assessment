fetch("https://ghibliapi.herokuapp.com/films")
  .then((response) => response.json())
  .then((films) => {
    const titles = document.querySelector("#titles");
    for (const film of films) {
      const option = document.createElement("option");
      option.textContent = film.title;
      option.setAttribute("value", film.title);
      titles.append(option);
    }

    let selectedFilm;
    const displayInfo = document.querySelector("#display-info");

    titles.addEventListener("change", () => {
      for (const film of films) {
        const filmReleasedDate = film.release_date;
        const filmDescription = film.description;

        if (titles.value === film.title) {
          selectedFilm = film;
          displayInfo.innerHTML = `<h3>${film.title}</h3>
            <p id="film-released-date">${filmReleasedDate}</p>
            <p id="film-description">${filmDescription}</p>`;
        }
      }
    });
  })
  .catch((error) => {
    console.log(error);
  });

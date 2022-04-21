let h3_Title = document.querySelector("h3");
let p_Year = document.getElementById("year");
let p_Des = document.getElementById("description");
let film = document.getElementById("titles");

function getTitles(movies) {
  let title = new Set();
  for (let movie of movies) {
    title.add(movie.title);
  }
  const dropdown = document.getElementById("titles");

  for (let titles of title) {
    const option = document.createElement("option");
    option.textContent = titles;
    option.value = titles;

    dropdown.append(option);

    film.addEventListener("click", (event) => {
      event.preventDefault;
      h3_Title.innerHTML = film.value;
    });
  }
  return [...title];
}

// function getYear(date) {

// }

fetch("https://ghibliapi.herokuapp.com/films/")
  .then((response) => response.json())

  .then((json) => {
    getTitles(json);
    // getYear(json);
  })

  .catch((error) => console.log(error));

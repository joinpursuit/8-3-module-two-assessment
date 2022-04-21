let h3_Title = document.querySelector("h3");
let p_Year = document.getElementById("year");
let p_Des = document.getElementById("description");
let film = document.getElementById("titles");

function getTitles(movies) {
  let title = new Set();

  for (let movie of movies) {
    title.add(movie.title);
  }
  //   const film = document.getElementById("titles");

  for (let titles of title) {
    const option = document.createElement("option");
    option.textContent = titles;
    option.value = titles;

    film.append(option);

    // const info = ({ title, release_date }) => {
    //   film.addEventListener("click", (event) => {
    //     event.preventDefault;
    //     h3_Title.innerHTML = film.value;
    //     p_Year.innerHTML = release_date;
    //   });
    // };
  }
  return [...title];
}

function getInfo(years) {
  let release_date = new Set();

  for (let year of years) {
    release_date.add(year.release_date);
  }
  for (let date of release_date) {
    //     p_Year.textContent = date;
    //   }

    //   return [...release_date];

    film.addEventListener("click", (event) => {
      event.preventDefault;
      h3_Title.innerHTML = film.value;

      p_Year.innerHTML = date;
    });
  }
}

fetch("https://ghibliapi.herokuapp.com/films/")
  .then((response) => response.json())

  .then((json) => {
    getTitles(json);
    getInfo(json);
  })

  .catch((error) => console.log(error));

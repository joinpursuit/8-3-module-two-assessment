let h3_Title = document.querySelector("h3");
let p_Year = document.getElementById("year");
let p_Des = document.getElementById("description");
let film = document.getElementById("titles");

function getTitles(movies) {
  let title = new Set();

  for (let movie of movies) {
    title.add(movie.title);
  }

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
    // let object = {};
    // object[date.title] = date.release_date;
    // date = object[date.release_date];

    // const option2 = document.createElement("option");
    // option2.textContent = date;
    // option2.value = date;

    // p_Year.append(option2);

    //   return [...release_date];

    film.addEventListener("click", (event) => {
      event.preventDefault;
      h3_Title.innerHTML = film.value;

      p_Year.innerHTML = date;
    });
  }
}

function getDes(des) {
  let description = new Set();

  for (let descrip of des) {
    description.add(descrip.description);
  }
  for (let info of description) {
    film.addEventListener("click", (event) => {
      event.preventDefault;

      p_Des.innerHTML = info;
    });
  }
}

fetch("https://ghibliapi.herokuapp.com/films/")
  .then((response) => response.json())

  .then((json) => {
    getTitles(json);
    getInfo(json);
    getDes(json);
  })

  .catch((error) => console.log(error));

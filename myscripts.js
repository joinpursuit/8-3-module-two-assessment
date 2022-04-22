let form = document.querySelector("form");
let h3_Title = document.querySelector("h3");
let p_Year = document.getElementById("year");
let p_Des = document.getElementById("description");
let film = document.getElementById("titles");

//selectbox dropdown
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

//get release date year
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

//get movie description
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

//write review
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = document.querySelector("input[type='text']");
  const ul = document.querySelector("ul");
  let li = document.createElement("li");
  ul.append(li);

  if (!film.value) {
    alert("Please select a movie first");
  } else {
    li.innerHTML = `<strong>${film.value}:</strong>${text.value}`;
    text.value = "";
  }

  //reset button removes list of reviews
  let reset = document.getElementById("reset-reviews");
  reset.addEventListener("click", (event) => {
    event.preventDefault();

    li.remove();
  });
});

//get list of people
let people = document.getElementById("show-people");
function displayNames(names) {
  let name = new Set();

  for (let people of names) {
    name.add(people.name);
  }

  for (let ppl of name) {
    people.addEventListener("click", (event) => {
      event.preventDefault;

      const ol = document.querySelector("ol");
      let li = document.createElement("li");
      ol.append(li);

      li.innerHTML = ppl;
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

fetch("https://ghibliapi.herokuapp.com/people")
  .then((response) => response.json())
  .then((test) => {
    displayNames(test);
  })
  .catch((displayError) => console.log(displayError));

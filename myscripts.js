let h3_Title = document.querySelector("h3");
let p_Year = document.getElementById("year");
let p_Des = document.getElementById("description");
let movies = document.getElementById("titles");

function getTitles(moives) {
  let title = new Set();
  for (let moive of moives) {
    title.add(moive.title);
  }
  const dropdown = document.getElementById("titles");

  for (let titles of title) {
    const option = document.createElement("option");
    option.textContent = titles;
    option.value = titles;

    dropdown.append(option);

    movies.addEventListener("click", (event) => {
      event.preventDefault;
      h3_Title.innerHTML = movies.value;
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

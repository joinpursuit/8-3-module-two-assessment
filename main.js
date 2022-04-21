const URL = "https://ghibliapi.herokuapp.com/films";
let select = document.getElementById("titles");
let reviewList = document.querySelector("section ul");

fetch(URL)
  .then((res) => res.json())
  .then((films) => {
    films.forEach((film) => populateTitles(film));
    selectedFilmInfo(films);

    let reviewForm = document.querySelector("section form");
    reviewForm.addEventListener("submit", (event) => {
      event.preventDefault();
      boldElement = document.createElement("strong");
      boldElement.textContent =
        document.querySelector("section div h3").textContent;
      let newReview = document.createElement("li");
      newReview.textContent = event.target.review.value;
      newReview.prepend(boldElement);
      reviewList.append(newReview);
      event.target.reset();
    });
  })
  .catch((error) => {
    console.log(error);
  });

let resetReviews = document.getElementById("reset-reviews");
resetReviews.addEventListener("click", (e) => {
  e.preventDefault();
  while (reviewList.firstChild) {
    reviewList.removeChild(reviewList.firstChild);
  }
});

populateTitles = (film) => {
  let option = document.createElement("option");
  option.textContent = film.title;
  option.value = film.id;
  select.append(option);
};

selectedFilmInfo = (filmObj) => {
  let displayInfo = document.getElementById("display-info");
  select.addEventListener("change", (event) => {
    event.preventDefault();
    let film = filmObj.find(({ id }) => id === event.target.value);
    displayInfo.textContent = "";
    listOfNames = document.querySelector("section ol");
    listOfNames.textContent = "";
    let title = document.createElement("h3");
    title.textContent = film.title;
    let year = document.createElement("p");
    year.textContent = film.release_date;
    let info = document.createElement("p");
    info.textContent = film.description;
    displayInfo.append(title, year, info);
    arrayOfPeopleURLs = film.people;
    fetch(`https://ghibliapi.herokuapp.com/people`)
      .then((res) => res.json())
      .then((people) => {
        people.forEach((person) => {
          if (person.films[0].includes(film.id)) {
            newName = document.createElement("li");
            newName.textContent = person.name;
            listOfNames.append(newName);
          }
        });
      });
  });
};

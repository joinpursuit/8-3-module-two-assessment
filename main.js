const URLfilms = "https://ghibliapi.herokuapp.com/films";
const URLpeople = "https://ghibliapi.herokuapp.com/people";
let select = document.getElementById("titles");

fetch(URLfilms)
  .then((res) => res.json())
  .then((films) => {
    films.forEach((film) => populateTitles(film));
    populateMovieDetails(films);
    reviewByTitle(films);
  })
  .catch((error) => {
    console.log(error);
  });

fetch(URLpeople)
  .then((res) => res.json())
  .then((people) => {
    populatePeople(people, select);
  })
  .catch((error) => {
    console.log(error);
  });

let populateTitles = (film) => {
  let option = document.createElement("option");
  option.textContent = film.title;
  option.value = film.id;
  select.append(option);
};

let deleteAll = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

let resetReviews = document.getElementById("reset-reviews");
resetReviews.addEventListener("click", (e) => {
  e.preventDefault();
  deleteAll(reviewList);
});

let populateMovieDetails = (filmsArray) => {
  let displayInfo = document.getElementById("display-info");
  select.addEventListener("change", (event) => {
    event.preventDefault();
    let film = filmsArray.find(({ id }) => id === event.target.value);
    deleteAll(displayInfo);
    let title = document.createElement("h3");
    title.textContent = film.title;
    let year = document.createElement("p");
    year.textContent = film.release_date;
    let info = document.createElement("p");
    info.textContent = film.description;
    displayInfo.append(title, year, info);
  });
};

const reviewByTitle = (filmsArray) => {
  let reviewForm = document.querySelector("section form");
  let reviewList = document.querySelector("section ul");
  reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let film = filmsArray.find(({ id }) => id === `${select.value}`);
    let boldElement = document.createElement("strong");
    boldElement.textContent = film.title;
    let newReview = document.createElement("li");
    newReview.textContent = event.target.review.value;
    newReview.prepend(boldElement);
    reviewList.append(newReview);
    event.target.reset();
  });
};

const populatePeople = (people, id) => {
  let peopleList = document.querySelector("section ol");
  let showPeopleButton = document.getElementById("show-people");
  showPeopleButton.addEventListener("click", (e) => {
    e.preventDefault();
    deleteAll(peopleList);
    people.forEach((person) => {
      if (id && person.films[0].includes(`${id.value}`)) {
        newName = document.createElement("li");
        newName.textContent = person.name;
        peopleList.append(newName);
      }
    });
  });
};

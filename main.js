const films_URL = 'https://ghibliapi.herokuapp.com/films/';
const people_URL = 'https://ghibliapi.herokuapp.com/people/';
const dropdown = document.getElementById('movie-dropdown');
const info = document.getElementById('display-info');
const reviewForm = document.querySelector('form');
const ul = document.querySelector('ul');
const peopleButton = document.getElementById('show-people');
const peopleNames = document.querySelector('ol');

fetch(films_URL)
  .then((res) => res.json())
  .then((movies) => {
    grabMovieData(movies);
    getReviews(movies);
  })
  .catch((e) => {
    console.log(e);
  });

/**
 * grabMovieData()- function that pulls required data points from each movie( title, year, description) and displays it on the webpage.
 * @param {[]object} movies- an array of objects with each one containing all of the movies info(title, release date, people, etc)
 */

const grabMovieData = (movies) => {
  movies.forEach((movie) => {
    const option = document.createElement('option');
    option.value = movie.id;
    option.textContent = movie.title;
    dropdown.append(option);
  });

  //https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event

  dropdown.addEventListener('change', (event) => {
    event.preventDefault();
    const chosenID = event.target.value;
    //console.log(chosenID);
    for (let movie of movies) {
      if (chosenID === movie.id) {
        info.textContent = '';
        const h3 = document.createElement('h3');
        info.prepend(h3);
        h3.textContent = movie.title;

        const p1 = document.createElement('p');
        info.append(p1);
        p1.textContent = movie.release_date;

        const p2 = document.createElement('p');
        info.append(p2);
        p2.textContent = movie.description;
      }
    }
    peopleButton.addEventListener('click', (event) => {
      event.preventDefault();
      fetch(people_URL)
        .then((res) => res.json())
        .then((people) => {
          peopleNames.innerHTML = '';
          for (let person of people) {
            for (let film of person.films) {
              if (film === `${films_URL}${chosenID}`) {
                let personLi = document.createElement('li');
                personLi.textContent = person.name;
                peopleNames.append(personLi);
              }
            }
          }
        })
    });
  });
};

/**
 * getReviews()- takes user input in the review box and displays them in list form
 * @param {[]object} movies - an array of objects with each one containing all of the movies info(title, release date, people, etc)
 */

function getReviews(movies) {
  reviewForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let reviewInput = document.getElementById('review').value;
    if (dropdown.value === '') {
      alert('Please select a movie first'); // hint by Myra on Zoom
    } else {
      let movie = movies.find((movie) => movie.id === dropdown.value);
      let li = document.createElement('li');
      li.innerHTML = `<strong>${movie.title}: </strong>${reviewInput}`;
      ul.append(li);
    }
    reviewForm.reset();
  });
}

const resetReviewsButton = document.getElementById('reset-reviews');

resetReviewsButton.addEventListener('click', (event) => {
  event.preventDefault();
  ul.innerHTML = '';
});

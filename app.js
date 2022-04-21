const writeMovieReviews = (movies, selectMovieTitle, movieInfo, form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const reviewInput = e.target.review.value;
    if (reviewInput === '' || reviewInput === null) {
      const errorMessage = document.querySelector('error');
      errorMessage.innerHTML =
        'Error!!! Reviews cannot be blank.Enter your review';
      return;
    }

    let duplicateListItem = false;
    ul = document.querySelector('ul');
    console.log('ul===', ul);

    const listItem = document.querySelectorAll('section ul li');
    const listArray = Array.from(listItem);
    listArray.forEach((list) => {
      console.log(list);
      if (list.textContent.includes(reviewInput)) {
        duplicateListItem = true;
      }
    });

    if (!duplicateListItem) {
      let li = document.createElement('li');
      li.innerHTML += `<strong>${selectMovieTitle.value}: </strong><span>${reviewInput}</span>`;
      ul.append(li);
      form.reset();
    }

    document.querySelectorAll('li').forEach((list) => {
      list.addEventListener('click', () => {
        list.remove();
      });
    });
  });
};

const renderMovieDetails = (movies, selectMovieTitle, movieInfo) => {
  selectMovieTitle.addEventListener('change', (e) => {
    e.preventDefault();

    movieInfo.innerHTML = '';
    const selectedVal = e.target.value;
    let title = document.createElement('h3');
    let release_date = document.createElement('p');
    let description = document.createElement('p');

    for (let movie of movies) {
      if (selectedVal === movie.title) {
        title.textContent = movie.title;
        release_date.textContent = movie.release_date;
        description.textContent = movie.description;
      }
    }
    movieInfo.append(title, release_date, description);
  });
};

const createSelect = (BASE_URL, selectMovieTitle, movieInfo, form) => {
  fetch(`${BASE_URL}films`)
    .then((res) => {
      return res.json();
    })
    .then((movies) => {
      movies.forEach((movie) => {
        let option = document.createElement('option');
        option.value = movie.title;
        option.textContent = movie.title;
        selectMovieTitle.append(option);
      });
      renderMovieDetails(movies, selectMovieTitle, movieInfo);
      writeMovieReviews(movies, selectMovieTitle, movieInfo, form);
    })
    .catch((error) => {
      console.log(error);
    });
};

const BASE_URL = 'https://ghibliapi.herokuapp.com/';
const selectMovieTitle = document.querySelector('section select');
const movieInfo = document.querySelector('#display-info');
const form = document.querySelector('form');

window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
  createSelect(BASE_URL, selectMovieTitle, movieInfo, form);
});

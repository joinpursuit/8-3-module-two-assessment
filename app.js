const writeMovieReviews = (
  movies,
  selectMovieTitle,
  movieInfo,
  form,
  resetReview
) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const errorMessage = document.querySelector('section p.error');
    errorMessage.innerHTML = ''

    const reviewInput = e.target.review.value;
    if (reviewInput === '' || reviewInput === null) {
      
      console.log(errorMessage);
      errorMessage.innerHTML = `Error!!! Reviews cannot be blank.Enter your review`;
      return;
    }

    if (selectMovieTitle.value === '' || selectMovieTitle.value === null) {
      if (reviewInput !== '' || reviewInput !== null) {
        alert("Please select a movie first");
      }
     return;
    }

    let duplicateListItem = false;
    ul = document.querySelector('ul');

    const listItem = document.querySelectorAll('section ul li');
    const listArray = Array.from(listItem);
    listArray.forEach((list) => {
      console.log(list);
      if (list.textContent.includes(reviewInput)) {
        duplicateListItem = true;
        form.reset();
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

    resetReview.addEventListener('click', () => {
      ul.innerHTML = '';
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

const createSelect = (
  BASE_URL,
  selectMovieTitle,
  movieInfo,
  form,
  resetReview
) => {
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
      writeMovieReviews(movies, selectMovieTitle, movieInfo, form, resetReview);
    })
    .catch((error) => {
      console.log(error);
    });
};

const BASE_URL = 'https://ghibliapi.herokuapp.com/';
const selectMovieTitle = document.querySelector('section select');
const movieInfo = document.querySelector('#display-info');
const form = document.querySelector('form');
const resetReview = document.querySelector('#reset-reviews');

window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
  createSelect(BASE_URL, selectMovieTitle, movieInfo, form, resetReview);
});

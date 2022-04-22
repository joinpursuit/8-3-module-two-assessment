const showPeopleNames = (
  BASE_URL,
  movies,
  selectMovieTitle,
  form,
  resetReview,
  ullistItem,
  peopleNamesList
) => {
  showPeople.addEventListener('click', (e) => {
    e.preventDefault();
    peopleNamesList.innerHTML = '';
    // errorMessage.innerHTML = '';

    fetch(`${BASE_URL}people`)
      .then((res) => {
        return res.json();
      })
      .then((people) => {
        console.log(people, selectMovieTitle.value);
        for (let person of people) {
          let filmID = person.films;
          if (filmID.length < 2) {
            // p = document.createElement('p)')
            // const errorMessage = document.querySelector('section p.error');
            console.log('error')

          }
          for (let film of filmID) {
            console.log('person=', person.id, person.name, 'film=', film);
            const getFilm = film.substring(film.lastIndexOf('/') + 1);

            console.log('gettttt=', getFilm, selectMovieTitle.value);
            if (selectMovieTitle.value === getFilm) {
              let personList = document.createElement('li');
              personList.textContent = person.name;
              peopleNamesList.append(personList);
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

/********************************/
/*  RENDERMOVIEDETAILS FUNCTION */
/*******************************/
/**
 *= writeMovoerenders and handles the form to take necessay input infornation
 * @param {string} BASE_URL -Ghibli app URL
 * @param { select tag} selectMovieTitle - select options dynamically created  * for select tag
 * @param {div tag} movieInfo- display the movie details once user selects the * movie
 * @param {form tag} form - form is used to handle all the input details and   * submit it
 * @param {button tag} resetReview - a button that resets listitems of ul list
 * @param {ul tag}  ullistItem - to access list items in the DOM
 * @param {ol tag} peopleNamesLisst - display the ordered list items
 * @modifies {string} modifies the DOM
 * @returns - No returns
 *
 */

const writeMovieReviews = (
  movies,
  selectMovieTitle,
  movieInfo,
  form,
  resetReview,
  ullistItem,
  peopleNamesList
) => {
  movieInfo.innerHTML = '';
  peopleNamesList.innerHTML = '';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const errorMessage = document.querySelector('section p.error');
    errorMessage.innerHTML = '';

    const reviewInput = e.target.review.value;
    if (reviewInput === '' || reviewInput === null) {
      // console.log(errorMessage);
      errorMessage.innerHTML = `Error!!! Reviews cannot be blank.Enter your review`;
      return;
    }

    if (selectMovieTitle.value === '' || selectMovieTitle.value === null) {
      if (reviewInput !== '' || reviewInput !== null) {
        alert('Please select a movie first');
      }
      return;
    }

    let duplicateListItem = false;
    ul = document.querySelector('ul');

    ullistItem = document.querySelectorAll('section ul li');
    const listArray = Array.from(ullistItem);
    listArray.forEach((list) => {
      if (list.textContent.includes(reviewInput)) {
        duplicateListItem = true;
        form.reset();
      }
    });
    let findMovie = movies.filter((ele) => ele.id === selectMovieTitle.value);
    // console.log(movies);
    if (!duplicateListItem) {
      let li = document.createElement('li');
      li.innerHTML += `<strong>${findMovie[0].title}: </strong><span>${reviewInput}</span>`;
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

/***************************/
/*  RENDERMOVIEDETAILS FUNCTION */
/*************************/
/**
 * renderMovieDetails renders all the necessary movie description and details
 * @param {string} BASE_URL -Ghibli app URL
 * @param { select tag} selectMovieTitle - select options dynamically created  * for select tag
 * @param {div tag} movieInfo- display the movie details once user selects the * movie
 * @param {form tag} form - form is used to handle all the input details and   * submit it
 * @param {button tag} resetReview - a button that resets listitems of ul list
 * @param {ul tag}  ullistItem - to access list items in the DOM
 * @param {ol tag} peopleNamesLisst - display the ordered list items
 * @modifies {string} modifies the DOM
 * @returns - No return
 *
 */

const renderMovieDetails = (
  movies,
  selectMovieTitle,
  movieInfo,
  form,
  resetReview,
  ullistItem,
  peopleNamesList
) => {
  console.log(movies, selectMovieTitle, movieInfo);
  selectMovieTitle.addEventListener('change', (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    movieInfo.innerHTML = '';
    const selectedVal = e.target.value;
    let title = document.createElement('h3');
    let release_date = document.createElement('p');
    let description = document.createElement('p');

    for (let movie of movies) {
      if (selectMovieTitle.value === movie.id) {
        title.textContent = movie.title;
        release_date.textContent = movie.release_date;
        description.textContent = movie.description;
      }
    }
    movieInfo.append(title, release_date, description);
  });
};

/***************************/
/*  CREATESELECT FUNCTION */
/*************************/
/**
 * createSelect fetches data from the api and calls the other appropraite
 * functions in the DOM to display a review, gneerate listItems and
 * @param {string} BASE_URL -Ghibli app URL
 * @param { select tag} selectMovieTitle - select options dynamically created  * for select tag
 * @param {div tag} movieInfo- display the movie details once user selects the * movie
 * @param {form tag} form - form is used to handle all the input details and   * submit it
 * @param {button tag} resetReview - a button that resets listitems of ul list
 * @param {ul tag}  ullistItem - to access list items in the DOM
 * @param {ol tag} peopleNamesLisst - display the ordered list items
 * @modifies {string} modifies the DOM
 * @returns - No return
 */

const createSelect = (
  BASE_URL,
  selectMovieTitle,
  movieInfo,
  form,
  resetReview,
  ullistItem,
  peopleNamesList
) => {
  fetch(`${BASE_URL}films`)
    .then((res) => {
      return res.json();
    })
    .then((movies) => {
      movies.forEach((movie) => {
        let option = document.createElement('option');
        option.value = movie.id;
        option.textContent = movie.title;
        selectMovieTitle.append(option);
      });

      renderMovieDetails(
        movies,
        selectMovieTitle,
        movieInfo,
        form,
        resetReview,
        ullistItem,
        peopleNamesList
      );
      writeMovieReviews(
        movies,
        selectMovieTitle,
        movieInfo,
        form,
        resetReview,
        ullistItem,
        peopleNamesList
      );
      showPeopleNames(
        BASE_URL,
        movies,
        selectMovieTitle,
        form,
        resetReview,
        ullistItem,
        peopleNamesList
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

/****************/
/*  MAIN BODY  */
/**************/

const BASE_URL = 'https://ghibliapi.herokuapp.com/';
const selectMovieTitle = document.querySelector('section select');
const movieInfo = document.querySelector('#display-info');
const form = document.querySelector('form');
const resetReview = document.querySelector('#reset-reviews');
const ullistItem = document.querySelectorAll('section ul li');
const peopleNamesList = document.querySelector('section ol');
const showPeople = document.querySelector('#show-people');

/***
 *
 * DOMCONTENTLOADED function
 *
 */
window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');

  /* generate select options dynamically **/

  createSelect(
    BASE_URL,
    selectMovieTitle,
    movieInfo,
    form,
    resetReview,
    ullistItem,
    peopleNamesList
  );
});

/********************************/
/*  SHOWPEOPLENAMES FUNCTION */
/*******************************/
/**
 *= showPeopleNames function displays all the people associated with a given  *  film ID
 * @param {string} BASE_URL -Ghibli app URL
 * @param { select tag} selectMovieTitle - select tag the contains the filmID   * and name of the film selected
 * @param {div tag} movieInfo- display the movie details once user selects the * movie
 * @param {form tag} form - form handles reviews a user inputs and submits it
 * @param {button tag} resetReview - a button that resets the review list
 * @param {ul tag}  ullistItem - to display all the reviews for the movie
 * @param {ol tag} peopleNamesList - display the peopleName associated with the * with the film the user seclected
 * @modifies {string} modifies the DOM
 * @returns - No returns
 *
 */

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

    fetch(`${BASE_URL}people`)
      .then((res) => {
        return res.json();
      })
      .then((people) => {
        for (let person of people) {
          let filmID = person.films;

          for (let film of filmID) {
            console.log('person=', person.id, person.name, 'film=', film);
            const getFilm = film.substring(film.lastIndexOf('/') + 1);

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
/*  WRITEMOVIEREVIEWS FUNCTION */
/*******************************/
/**
 *= writeMovoerenders function takes in the user review as input and displays  * it as a list item under the reviews section of the app. It checks for       * duplicates and does not display it. The user can also delete a review by   *  clicking on it.
 * (Found a bug last minute as it was not displaying the same review for another * movie if entered. Need to work on the duplicate of that)
 * @param {string} BASE_URL -Ghibli app URL
 * @param { select tag} selectMovieTitle - select tag the contains the filmID   * and name of the film selected
 * @param {div tag} movieInfo- display the movie details once user selects the * movie
 * @param {form tag} form - form handles reviews a user inputs and submits it
 * @param {button tag} resetReview - a button that resets the review list
 * @param {ul tag}  ullistItem - to display all the reviews for the movie
 * @param {ol tag} peopleNamesList - display the peopleName associated with the * with the film the user seclected
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
      errorMessage.innerHTML = `Error!!! Reviews cannot be blank.Enter your review`;
      setTimeout(() => {
        errorMessage.style.display = 'none';
      }, 2000);
      errorMessage.style.display = 'block';
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
      if (
        list.textContent.includes(reviewInput) &&
        list.textContent.includes(movies.title)
      ) {
        duplicateListItem = true;
        form.reset();
      }
    });

    let findMovie = movies.filter((ele) => ele.id === selectMovieTitle.value);

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

    resetReview.addEventListener('click', () => {});
  });
};

/*********************************/
/*  RENDERMOVIEDETAILS FUNCTION  */
/*********************************/
/**
 * renderMovieDetails displays all description , movie title and the release   * date once the user selects a movie
 * @param {string} BASE_URL -Ghibli app URL
 * @param { select tag} selectMovieTitle - select tag the contains the filmID   * and name of the film selected
 * @param {div tag} movieInfo- display the movie details once user selects the * movie
 * @param {form tag} form - form handles reviews a user inputs and submits it
 * @param {button tag} resetReview - a button that resets the review list
 * @param {ul tag}  ullistItem - to display all the reviews for the movie
 * @param {ol tag} peopleNamesList - display the peopleName associated with the * with the film the user seclected
 * @modifies {string} modifies the DOM
 * @returns - No returns
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

    movieInfo.innerHTML = '';

    const selectedVal = e.target.value;
    let title = document.createElement('h3');
    let release_date = document.createElement('p');
    let description = document.createElement('p');

    for (let movie of movies) {
      if (selectedVal === movie.id) {
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
 * createSelect function fetches data from the api and calls the
 * renderMovieDetails, writeMovieReviews and showPeopleNames helper functions  * according to the user selection on the app
 * @param {string} BASE_URL -Ghibli app URL
 * @param { select tag} selectMovieTitle - select tag the contains the filmID   * and name of the film selected
 * @param {div tag} movieInfo- display the movie details once user selects the * movie
 * @param {form tag} form - form handles reviews a user inputs and submits it
 * @param {button tag} resetReview - a button that resets the review list
 * @param {ul tag}  ullistItem - to display all the reviews for the movie
 * @param {ol tag} peopleNamesList - display the peopleName associated with the * with the film the user seclected
 * @modifies {string} modifies the DOM
 * @returns - No returns
 *
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

/** Global variables to access the DOM Elements */
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

  /* A function call to generate select options dynamically **/

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

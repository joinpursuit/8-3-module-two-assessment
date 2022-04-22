const BASE_URL        = 'https://ghibliapi.herokuapp.com/films/',
      selectTitles    = document.querySelector('#titles'),
      formReviews     = document.querySelector('#movie-reviews'),
      btnShowPeople   = document.querySelector('#show-people'),
      listPeople      = document.querySelector('#people-list'),
      listReviews     = document.querySelector('#review-list'),
      btnResetReviews = document.querySelector('#reset-reviews'),
      movieReviews    = {};

let   movies       = [],
      currentMovie = '';
// >> Filling out the movie list select with all movie titles.
getAllMovieTitles(BASE_URL);

/**
 * ==================================
 * E V E N T   L I S T E N E R S
 * ==================================
 * 
 * ============
 * selectTitles >> Event listener from the movie list select 
 * ============
 */
selectTitles.addEventListener('change', function () {
    currentMovie = this.value;
    if(listPeople.hasChildNodes){
        removeNodes(listPeople);
    }
    renderMovieDescription(this.value);
});
/**
 * ===========
 * formReviews >> Event listener from the reviews form 
 * ===========
 */
formReviews.addEventListener('submit', function (event) {
    event.preventDefault();
    const { review } = event.target;
    // >> Validating if a movie title was in fact selected, plus 
    // >> As a second validation if a review was in fact written  
    if(currentMovie === ''){
        alert('Please select a movie first')
    }
    else if(review.value === ''){
        alert('Please write a review first')
    }else{
        addMovieReview(review.value);
        formReviews.reset();
    }
});
/**
 * =============
 * btnShowPeople >> Event listener from the show people button
 * =============
 */
btnShowPeople.addEventListener('click', function () {
    // >> Validating if there are list items inside the list
    if(listPeople.hasChildNodes){
        removeNodes(listPeople);
    }
    getPeopleByMovie(currentMovie);
});
/**
 * ===============
 * btnResetReviews >> Event listener from the reset reviews button
 * ===============
 */
 btnResetReviews.addEventListener('click', function () {
    // >> Reseting all reviews
    removeNodes(listReviews);
});


/**
 * ==================================
 * function >> getAllMovieTitles()
 * ==================================
 * Given a url as parameter, excutes a request to get all the movies from the API, if the request is successful
 * then proceed to fill out a html select element with all the movie titles.
 * @param {string} url - A string that represents an url with all the movies.
 * @returns {} No returns a value.
 */
function getAllMovieTitles(url){
    fetch(url)
    .then((response) => response.json())
    .then(data => {
        // >> Looping through the data retrieved from the API.
        data.forEach((movie) => {
            // >> Cloning the remote data to create a local copy.
            movies = [...data];
            const option = new Option(movie.title, movie.id);
            selectTitles.add(option);
        });
    })
    .catch((error) => {
        const message = createErrorMessage(error);
        document.querySelector("main").append(message);
    });
}

/**
 * ==================================
 * function >> renderMovieDescription()
 * ==================================
 * Given a movie id as parameter, gets the respective data like: title, release year and description 
 * @param {string} movie - A string that represents the id movie identifier .
 * @returns {} No returns a value. 
 */
function renderMovieDescription(movie) {
    // >> Creating instances of html elements
    const movieInfo        = document.querySelector('#display-info'),
          movieTitle       = document.createElement('h3'),
          movieRelease     = document.createElement('p'),
          movieDescription = document.createElement('p');
    // >> Validating if there are child nodes, in that case proceed to remove them to refresh the data
    if(movieInfo.hasChildNodes){
        removeNodes(movieInfo)
    }
    // >> Looping through the local stored data
    movies.forEach(element => {
        if(element.id == movie){
            movieTitle.textContent = element.title;
            movieRelease.textContent = element.release_date;
            movieDescription.textContent = element.description;
        }
        movieInfo.append(movieTitle, movieRelease, movieDescription)
    })
}

/**
 * ==================================
 * function >> addMovieReview()
 * ==================================
 * Given a review written by the user, it proceeds to appended it to the list of reviews
 * @param {string} review - A string that represents a review inputted through the reviews form.
 * @returns {} No returns a value. 
 */
function addMovieReview(review){
    const reviewList = document.getElementById('review-list'),
          reviewItem = document.createElement('li');
    
    const movie = movies.find((e) => e.id === currentMovie);

    reviewItem.innerHTML = `<b>${movie.title} :</b> ${review}`;
    console.log(reviewItem.innerHTML)
    console.log(reviewItem)
    movieReviews[currentMovie] = [reviewItem.innerHTML]
    reviewList.appendChild(reviewItem);
}

/**
 * ==================================
 * function >> getPeopleByMovie()
 * ==================================
 * Given a movie id then proceeds to get all the people asscoiated with it.  
 * @param {string} id - A string that represents a movie id.
 * @returns {} No returns a value. 
 */
function getPeopleByMovie(id) {
    movies.forEach(movie => {
        if(movie.id == id){
            // >> Getting the people url's array associated a its respective movie.
            getPeopleName(movie.people)
        }
    })
}

/**
 * ==================================
 * function >> getPeopleName()
 * ==================================
 * Given a respective url person executes a call to the API to get the data from the all the people
 * associated to a every movie
 * @param {string} people - A string that represents a person url to get its respective data from the API.
 * @returns {} No returns a value. 
 */
function getPeopleName(people) {
    // >> Executes a new fetch to get the data of every person
    people.forEach(url => {
        fetch(url)
        .then((response) => response.json())
        .then(people => {
            console.log(people.name)
            const item = document.createElement('li');
            if(people.name !== undefined){
                item.textContent = people.name;
            }else{
                item.innerText = 'There is not people associated with the movie';
            }
            // >> Adding every list item with the names to the list    
            listPeople.appendChild(item)
        })
        .catch((error) => {
            const message = createErrorMessage(error);
            document.querySelector("main").append(message);
        });
    })
}

/**
 * ==================================
 * function >> removeNodes()
 * ==================================
 * Given a html element parent proceeds to select all the childs, then executes a loop to remove all of them. 
 * @param {string} parent - A string that represents a parent html element.
 * @returns {} No returns a value. 
 */
function removeNodes(parent) {
    parent.querySelectorAll('*').forEach(node => node.remove());
}

/**
 * ==================================
 * function >> createErrorMessage()
 * ==================================
 * Gets a specific error generated by the catch method as a result of a request to the API.
 * @param {string} message - A string that represents an error message.
 * @returns {string} Returns a string that represents a HTML element with an error message.
 */
 function createErrorMessage(message) {
    const section = document.createElement("section");
    section.classList.add("error");
    section.innerHTML = `<p>There was an error!</p><p class="message">${message}</p>`
  
    return section;
}
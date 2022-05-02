const films = "https://ghibliapi.herokuapp.com/films";
const people = "https://ghibliapi.herokuapp.com/people";
const dropdown = document.getElementById("dropdown-menu");
const select = document.querySelector("submit");

// Movie Titles/Drop Down
fetch(films)
  .then((response) => response.json())
  .then((movies) => {
    for (let movie of movies) {
      const option = document.createElement("option");
      option.value = movie.id;
      option.textContent = movie.title;
      dropdown.append(option);
    
    }
    
  
// Movie Info
    fetch(films)
    .then((response) => response.json())
    .then((movies) => {
    dropdown.addEventListener("change", (event) => { 
      event.preventDefault();
      const chosenMovie = event.target.value
      
      for (let movie of movies){
      if (chosenMovie === movie.id) {
       title = document.getElementById("movie-title");
       year = document.getElementById("release-year");
       description = document.getElementById("description");
      
        title.textContent = `Title : ${movie.title}`;
        description.textContent = `Description : ${movie.description}`;
        year.textContent = `Year Released : ${movie.release_date}`;
      }
    }
    })
  })

  })

      // })
  
    // Get People 
const peopleButton = document.getElementById("show-people");
peopleButton.addEventListener("click", (event) => {
 
  fetch(people)
    .then((response) => response.json())
    .then((json) => {
      for (let person of json) {
        for (let films of person.films) {
          const peopleList = document.getElementById("list-of-people");
          const list = document.createElement("li");
          let movieTitle = dropdown.value;
          if (films.includes(movieTitle)) {
            list.textContent = person.name;
            peopleList.append(list);
          }
        }
      }
    })
    .catch((error) => {
      console.log("We have come into an error ");
    });
});

// })

fetch(films)
  .then((response) => response.json())
  .then((movies) => {

    // for (let movie of movies){
const reviewForm = document.getElementById("review");
const reviewSubmitButton = document.getElementById("review-submit")
title = document.getElementById("movie-title");
reviewSubmitButton.addEventListener("click", (event) => {
  event.preventDefault();
  const movie = movies.find((movie) => movie.id === dropdown.value);
  const unordered = document.querySelector('ul')

  const reviewList = document.createElement('li');
  reviewList.setAttribute('id','addAReview')
//  if (dropdown === movie.title)
  reviewList.innerHTML = `<strong>${movie.title}</strong>: ${reviewForm.value} `
  unordered.append(reviewList);
  // reviewForm.reset();
  // unordered.append(reviewList);

})
    

    
  })


// Reset Button

const resetReviewButton = document.getElementById("reset-reviews");
resetReviewButton.addEventListener("click", (event) => {
  event.preventDefault();
  const clear = document.querySelector('ul')
  clear.textContent = "";
});

// }
// function addAReview(){

// }

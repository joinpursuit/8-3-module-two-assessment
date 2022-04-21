const dropDown = document.getElementById('movie-dropdown');
const info = document.getElementById('display-info');
const ul = document.querySelector('ul');
const generatePeople = document.getElementById('show-people')
const reviewForm = document.querySelector('form');


//Fetch API Ghibli data

fetch('https://ghibliapi.herokuapp.com/films')
.then((response) => response.json())
.then((movies) => {
    getMovieInfo(movies);
    getReviews(movies);
})
.catch((e) => {
    console.log(e);
});

const getMovieInfo = (movies) => {
    movies.forEach((movie) => {
        const option = document.createElement('option');
        option.value = movie.id;
        option.textContent = movie.title;
        dropDown.append(option);
    });

       dropDown.addEventListener('change', (event) => {
                    event.preventDefault();
                    const userChoose = event.target.value;
                    for (let movie of movies) {
                        if (userChoose === movie.id) {
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
           };
          });
        };

    function getReviews(movies) {
        reviewForm.addEventListener('submit', (event) => {
            event.preventDefault();
            let reviewInput = document.getElementById('review').value;
            if (dropDown.value === '') {
                alert('Please select a movie first')
            } else {
                let movie = movies.find((movie) => movie.id === dropDown.value);
                let li = document.createElement('li')
                li.innerHTML = `<strong>${movie.title}: </strong>${reviewInput}`;
                ul.append(li);
            }
            reviewForm.reset();
        });
    }

    const resetReviewButton = document.getElementById('reset-reviews');
    resetReviewButton.addEventListener('click', (event) => {
        event.preventDefault();
        ul.innerHTML = '';
    });

    function getPeople(movies) {
        generatePeople.addEventListener('click', (event) => {
            event.preventDefault();
        })
    }


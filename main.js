/** @format */
const BASE_URL = 'https://ghibliapi.herokuapp.com/films/';
const selectBox = document.getElementById('titles');
const displayInfo = document.getElementById('display-info');
const form = document.querySelector('form');
const ul = document.querySelector('ul');
const li = document.createElement('li');
const peopleButton = document.getElementById('show-people'); // dont think I'm going to get to this part
const thePeople = document.querySelector('ol'); // or this one either

fetch(BASE_URL)
	.then((response) => {
		return response.json();
	})
	.then((movies) => {
		getTheDamnMovies(movies);
		getTheDamnReviews(movies);
		resetReviews(movies);
	});

const getTheDamnMovies = (movies) => {
	movies.forEach((movie) => {
		const option = document.createElement('option');
		option.setAttribute('value', movie.id);
		option.textContent = movie.title;
		selectBox.append(option);
	});

	selectBox.addEventListener('change', (event) => {
		event.preventDefault();
		let userInput = event.target.value;
		return movies.map((movie) => {
			if (userInput === movie.id) {
				displayInfo.textContent = '';

				const h3 = document.createElement('h3');
				displayInfo.prepend(h3);
				h3.textContent = movie.title;

				const p1 = document.createElement('p');
				displayInfo.append(p1);
				p1.textContent = movie.release_date;

				const p2 = document.createElement('p');
				displayInfo.append(p2);
				p2.textContent = movie.description;
			}
		});
	});
};

const getTheDamnReviews = (movies) => {
	form.addEventListener('submit', (event) => {
		event.preventDefault();
		let yourReview = document.getElementById('review').value;
		if (selectBox.value === '') {
			alert('Silly goose, you must select a movie first!');
		} else  { (selectBox === movie.title) 


        }
			li.innerHTML = `<strong>${movie.title}:</strong>${yourReview}`;
			ul.append(li);
		
		form.reset();
	});
};

const resetButton = document.getElementById('reset-reviews');
const resetReviews = (movies) =>
	resetButton.addEventListener('click', () => {
		ul.remove();
	});

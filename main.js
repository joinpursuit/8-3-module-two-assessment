const BASE_URL = `https://ghibliapi.herokuapp.com/films`;
const movies = document.querySelector("#titles");
const selector = document.querySelector(".selector form");
//const movieDetails = document.querySelector("#display-info");
const reviewForm = document.querySelector("#review-form form");
let obj;

const populateFilms = (file) => {
	obj = file;
	for (let movie in file) {
		// let movieTitle= movie.title;
		//console.log(file);
		let entry = document.createElement("option");
		entry.value = file[movie].id; //bizzare
		entry.textContent = file[movie].title;
		movies.append(entry);
	}
};

fetch(BASE_URL)
	.then((response) => response.json())
	.then((json) => populateFilms(json))
	.catch((error) => console.log(error));

selector.addEventListener("change", (event) => {
	let movieId = event.target.value;
	for (let movie in obj) {
		if (obj[movie].id === movieId) {
			document.querySelector("#display-info h3").textContent = obj[movie].title;
			document.querySelector("#display-info p#release-year").textContent =
				obj[movie].release_date;
			document.querySelector("#display-info p#description").textContent =
				obj[movie].description;
		}
	}
	//console.log(movieId);
});

reviewForm.addEventListener("submit", (event) => {
	let review = reviewForm.value;
	reviewForm.value = "";
	let reviewList = document.querySelector("#review-list ul");
	let listItem = document.createElement("li");
	listItem.textContent = review; //TODO: needs movie title in <strong> as well
	reviewList.append(listItem);
});

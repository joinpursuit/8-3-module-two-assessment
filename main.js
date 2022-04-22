const BASE_URL = `https://ghibliapi.herokuapp.com`;
const format = `/films`;
let id = "";
const form = document.getElementById("reviewForm");
const inputReview = document.getElementById("review");
const selected = document.getElementById("movieTitles");

fetch(`${BASE_URL}${format}/${id}`)
  .then((Response) => Response.json())
  .then((data) => {
    populateSelectBoxWithMovieTitles(data);
    movieDescription(data);
    getTitle(data);
    resetReviews();
  })
  .catch((error) => {
    console.log(error);
  });

function populateSelectBoxWithMovieTitles(data) {
  for (let i = 0; i < data.length; i++) {
    const selectBox = document.getElementById("movieTitles");
    const option = document.createElement("option");
    option.text = data[i].title;
    option.value = data[i].release_date;
    selectBox.add(option);
  }
}

function movieDescription(data) {
  const selectBox = document.getElementById("movieTitles");
  const h3 = document.createElement("h3");
  const releaseYear = document.createElement("p");
  const movieDescription = document.createElement("p");
  const movieDetailsSection = document.getElementById("movieDetails");
  const div = document.getElementById("display-info");

  /** https://www.codegrepper.com/code-examples/javascript/javascript+event+listener+on+select+option */
  selectBox.addEventListener("change", function () {
    for (let i = 0; i < data.length; i++) {
      if (this.value === data[i].release_date) {
        movieDetailsSection.append(h3);
        h3.innerHTML = data[i].title;
        div.append(h3);

        movieDetailsSection.append(releaseYear);
        releaseYear.innerHTML = data[i].release_date;
        div.append(releaseYear);

        movieDetailsSection.append(movieDescription);
        movieDescription.innerHTML = data[i].description;
        div.append(movieDescription);
      }
    }
  });
}

function getTitle(data) {
  const selectBox = document.getElementById("movieTitles");
  selectBox.addEventListener("change", function () {
    for (let i = 0; i < data.length; i++) {
      if (this.value === data[i].release_date) {
        movieTitle = data[i].title;
      }
    }
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const list = document.getElementById("list");
  const listReviewItem = document.createElement("li");
  listReviewItem.innerHTML = `<strong><b>${movieTitle}:</strong></b> ${inputReview.value}`;
  list.append(listReviewItem);
  form.reset();
});

function resetReviews() {
  const button = document.getElementById("reset-reviews");
  button.addEventListener("click", () => {
    document.querySelectorAll("ul li").forEach((item) => item.remove());
  });
}

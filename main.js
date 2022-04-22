const form = document.querySelector("form");
const select = document.getElementById("select");
const review = document.getElementById("review");
const display = document.getElementById("display-info");
const inputted = document.getElementById("input");

// Fetching API
fetch(`https://ghibliapi.herokuapp.com/films`)
  .then((response) => response.json())
  .then((json) => {
    parse(json);
    info(json, selected);
    reviewed(json, input, selected);
  })
  .catch((error) => console.log(error));
// Event Listener on our drop down.
form.addEventListener("select", (event) => {
  event.preventDefault();
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
});
let selected = document.getElementById("select").value;
let input = document.getElementById("review").value;
// Function to Parse through our API & Append options into the drop down.
// Used stackoverflow to help with this.
function parse(file) {
  let arr = [];
  for (const current of file) {
    arr.push(current.title);
  }
  for (let i = 0; i < arr.length; i++) {
    let option = document.createElement("option");
    option.value = arr[i];
    option.text = arr[i];
    select.appendChild(option);
  }
}
function info(file, selected) {
  let infoName = document.createElement("h3");
  let infoYear = document.createElement("p");
  let infoDes = document.createElement("p");

  let parent = document.createElement("div");
  display.append(parent);

  infoName.innerHTML = file.title[0];
  infoYear.innerHTML = selected.release_date;
  infoDes.innerHTML = selected.description;

  parent.appendChild(infoName);
  parent.appendChild(infoYear);
  parent.appendChild(infoDes);
}
function reviewed(file, input, selected) {
  let userReview = document.createElement("ul");

  let parent2 = document.createElement("div");
  review.appendChild(parent2);

  userReview.innerHTML = `<strong>${selected}:</strong> ${input} ${file.title}`;
  parent2.appendChild();
}

let API_URL = 'https://ghibliapi.herokuapp.com/films/'; //API Link
let CHAR_URL = 'https://ghibliapi.herokuapp.com/people/';
let dropdown = document.getElementById('title');
let display = document.getElementById('display-info');
let reviewForm = document.querySelector('form');
let button = document.getElementById('show-people');
let names = document.querySelector('ol');
let ul = document.querySelector('ul');
fetch(API_URL)
  .then((response) => response.json())
  .then((json) => {
    for (let movieTitle of json) {
    const option = new Option(movieTitle.title, movieTitle.title);
    option.textContent = movieTitle.title;
    option.value = movieTitle.id;
    dropdown.append(option);
    dropdown.addEventListener('change', (event) => {
    event.preventDefault();
    const identifaction = event.target.value;
    for (let movie of json) {
    if (identifaction === movie.id) {
        display.textContent = '';
        const h3 = document.createElement('h3');
        display.prepend(h3);
        h3.textContent = movie.title;
        const p1 = document.createElement('p');
        display.append(p1);
        p1.textContent = movie.release_date;
        const p2 = document.createElement('p');
        display.append(p2);
        p2.textContent = movie.description;
          }
        }
        button.addEventListener('click', (event) => {
          event.preventDefault();
          fetch(CHAR_URL)
            .then((response) => response.json())
            .then((people) => {
              people.innerHTML = '';
              for (let person of people) {
                for (let film of person.films) {
                  if (film === `${API_URL}${identifaction}`) {
                    let personList = document.createElement('li');
                    personList.textContent = person.name;
                    names.append(personList);
                  }
                }
              }
            });
        });
      });
    }
    getReviews(json);
  })
  .catch((error) => {
    console.log(error);
  });
function getReviews(item) {
  reviewForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let input = document.getElementById('review').value;
    if (dropdown.value === '') {
      alert('Please select a movie first');
    } else {
      let movie = item.find((movie) => movie.id === dropdown.value);
      let li = document.createElement('li');
      li.innerHTML = `<strong>${movie.title}:</strong>${input}`;
      ul.append(li);
    }
    reviewForm.reset();

});
}

let BASE_URL = 'https://ghibliapi.herokuapp.com/films/'; //API Link
let PEOPLE_URL = 'https://ghibliapi.herokuapp.com/people/'

let dropdown = document.getElementById('title')
let info = document.getElementById('display-info')
let reviewForm = document.querySelector('form')
let peopleButton = document.getElementById('show-people')
let peopleNames = document.querySelector('ol')
let ul = document.querySelector('ul')

fetch(BASE_URL) 
        .then((response) => response.json())
        .then((json) => {
          for (let e of json) {
            const option = new Option(e.title, e.title);
            option.textContent = e.title;
            option.value = e.id;
            dropdown.append(option);
            dropdown.addEventListener('change', (event) => {
                event.preventDefault();
                const chosenID = event.target.value
                for (let movie of json) {
                  if (chosenID === movie.id) {
                  info.textContent = ''
                  const h3 = document.createElement('h3');
                  info.prepend(h3);
                  h3.textContent = movie.title;

                  const p1 = document.createElement('p');
                  info.append(p1)
                  p1.textContent = movie.release_date;

                  const p2 = document.createElement('p');
                  info.append(p2)
                  p2.textContent = movie.description;
                  }
                }
                peopleButton.addEventListener('click', (event) => {
                  event.preventDefault()
                  fetch(PEOPLE_URL)
                  .then((response) => response.json())
                  .then((people) => {
                    people.innerHTML = '';
                    for (let person of people) {
                      for (let film of person.films) {
                        if (film === `${BASE_URL}${chosenID}`) {
                          let personList = document.createElement('li');
                          personList.textContent = person.name
                          peopleNames.append(personList)
                        }
                      }
                    }
                  })
                }) 
            })
          }
          getReviews(json);
        })
        .catch((error) => {
            console.log(error);
          });

function getReviews(json) {
  reviewForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let reviewInput = document.getElementById('review').value;
    if (dropdown.value === '') {
      alert('Please select a movie first');
    } else {
      let movie = json.find((movie) => movie.id === dropdown.value);
      let li = document.createElement('li');
      li.innerHTML = `<strong>${movie.title}:</strong>${reviewInput}`;
      ul.append(li)
    }
    reviewForm.reset()
  })
}
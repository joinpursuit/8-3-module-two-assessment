const base_URL = 'https://ghibliapi.herokuapp.com/films';
const dropdown = document.getElementById('movie-dropdown');
const info = document.getElementById('display-info');
const reviewForm = document.querySelector('form');

fetch(base_URL)
  .then((response) => response.json())
  .then((movies) => {
    movies.forEach((movie) => {
      const option = document.createElement('option');
      option.setAttribute('value', movie.id);
      option.textContent = movie.title;
      dropdown.append(option);

//https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
// eventlistener 'click' wasnt working, so i looked for other actions for select elements. found 'change'.

      dropdown.addEventListener('change', (event) => {
        event.preventDefault();
        movies.forEach((movie) => {
          if (event.target.value === movie.id) {
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
        });
      });
    });
  });

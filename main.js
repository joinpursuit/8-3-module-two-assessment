fetch('https://ghibliapi.herokuapp.com/films')
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    getFilms(response);
  });

const getFilms = (response) => {
  const titles = document.getElementById('titles');
  response.forEach((film) => {
    const option = document.createElement('option');
    option.setAttribute('value', film.id);
    option.textContent = film.title;
    titles.append(option);
  });

  titles.addEventListener('change', (event) => {
    event.preventDefault();
    const match = response.find((film) => film.id === event.target.value);

    const title = document.getElementById('title');
    const year = document.getElementById('year');
    const description = document.getElementById('description');

    title.textContent = match.title;
    year.textContent = match.release_date;
    description.textContent = match.description;
  });
};

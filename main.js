fetch("https://ghibliapi.herokuapp.com/films")
  .then((response) => response.json())
  .then((films) => {})
  .catch((error) => {
    console.log(error);
  });

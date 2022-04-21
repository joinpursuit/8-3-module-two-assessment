fetch("https://ghibliapi.herokuapp.com/films")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((data) => console.log(data.title));
  })
  .catch((error) => {
    console.log(error);
  });

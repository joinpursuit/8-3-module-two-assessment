
 const BASE_URL = 'https://ghibliapi.herokuapp.com/films/';
let dropdown = document.querySelector('#titles')
  fetch(BASE_URL)
  .then((response) => response.json())
  .then((json) => {
    for (let e of json) {
      const option = new Option(e.title, e.title);
      option.textContent = e.title;
      option.value = e.id;
      dropdown.append(option);
    }




})
  .catch((error) => {
    console.log(error);
  });
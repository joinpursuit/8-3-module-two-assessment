let BASE_URL = 'https://ghibliapi.herokuapp.com/films/'; //API Link

let dropdown = document.getElementById('title')

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

const displayData = (data) => {
    console.log(data);
}

const displayError = (error) => {
    console.log(error);
}
    //an event listener for user input
    //create input element, create form element for search bar
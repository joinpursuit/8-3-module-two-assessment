let select = document.getElementById('titles');
let details = document.getElementById('display-info')
const url = 'https://ghibliapi.herokuapp.com/films';


select.addEventListener("select", (event) => {
    event.preventDefault();
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            for (let i = 0; i < json.length; i++) {
                option = document.createElement('option');
                option.text = json[i].title;
                option.value = json[i].title;
                select.add(option);
            }
        })
        .catch((error) => {
            console.error(error)
        });
})
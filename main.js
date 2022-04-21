
fetch('https://ghibliapi.herokuapp.com/films')
.then( (response) => {
    return response.json();
}).then( (response) => {
    console.log(response)
})
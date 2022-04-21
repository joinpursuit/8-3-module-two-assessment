fetch('https://ghibliapi.herokuapp.com/films')
.then( (response) => {
    return response.json();
}).then( (response) => {
    console.log(response)
    getFilms(response)
})

const getFilms = (response) => {
    const titles = document.getElementById("titles")
    response.forEach( film => {
        const option = document.createElement("option")
        option.setAttribute('value', film.id)
        option.textContent = film.title
        titles.append(option)
    });
}

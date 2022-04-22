const BASE_URL = `https://ghibliapi.herokuapp.com/films`
const selectDropDown = document.querySelector("select")
const movieTitle = document.querySelector("div h3")
const movieInfo = document.querySelectorAll("div p")

fetch(BASE_URL) 
.then((res) => res.json())
.then((res) => {
    console.log(res)
    movieList(res)
})
.catch((error) => console.log(error))

function movieList(res) {
    movieTitles = res.map((element) => {
        return element.title
    })

    for (let movie of movieTitles) {
        const title = document.createElement("option")
        title.innerText = movie
        selectDropDown.append(title)
    }
}

selectDropDown.addEventListener("change", (event) => {  
    movieTitle.innerText = ""
    movieInfo[0].innerText = ""
    movieInfo[1].innerText = ""

    fetch(BASE_URL)
    .then((res) => res.json())
    .then((res) => {
        let selectedMovie = res.find((movie) => {
            return movie.title === event.target.value
        })
        
        movieTitle.innerText = `${selectedMovie.title}`
        movieInfo[0].innerText = `${selectedMovie.release_date}`
        movieInfo[1].innerText = `${selectedMovie.description}`
    })
    .catch((error) => console.log(error))
})


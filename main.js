

let Base_Url = 'https://ghibliapi.herokuapp.com/'
let film = 'films'

const selectMovieTitle = (movies) => {
    let array = []
    movies.forEach((movie) => {
        array.push(movie.title)
    })
    array.sort((a, b) => {
        if (a < b) {
            return -1
        }
        if (a > b) {
            return 1
        }

        return 0
    })

    array.forEach((title) => {
         let options = document.createElement('option')

         let select = document.getElementById('title')
        options.textContent = title
        select.append(options)
        console.log(select)
    })
}

fetch(`${Base_Url}${film}`)
  .then((response) => response.json())
  .then((json) => selectMovieTitle(json))
  .catch((error) => console.log(error))



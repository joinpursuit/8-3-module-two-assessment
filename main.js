let select = document.querySelector('select')
let dropdown = document.getElementById('title')
let option = document.querySelector('option')
let selectoption = document.querySelectorAll('option')
let div = document.querySelector('div')
let h3 = document.querySelector('h3')
let p = document.querySelectorAll('p')
let form = document.querySelector('form')
let text = document.querySelector("input[type ='text']")
let ul = document.querySelector('ul')
let button = document.getElementById('reset-reviews')
let list = document.querySelectorAll('li')

console.log(select.value)

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

    options.textContent = title
    select.append(options)
  })
}

const description = (movies) => {
  let object = {}

  for (let movie of movies) {
    object[movie.title] = [movie.release_date, movie.description]
  }

  select.addEventListener('change', (event) => {
    for (let [key, value] of Object.entries(object)) {
      if (event.target.value === key) {
        h3.textContent = event.target.value
        p[0].textContent = value[0]
        p[1].textContent = value[1]
      }
    }
  })
}

fetch(`${Base_Url}${film}`)
  .then((response) => response.json())
  .then((json) => {
    selectMovieTitle(json), description(json)
  })
  .catch((error) => console.log(error))

//alert when user start to input comment.window alert pop up
// if there is no movie

form.addEventListener('submit', (event) => {
  event.preventDefault()

  if (dropdown.value === '') {
   alert("Please select movie first")
  } else {
    let li = document.createElement('li')
    ul.append(li)

    li.innerHTML = `<b>${h3.textContent}:</b> ${text.value}`
     form.reset()
  }
   
})

button.addEventListener('click', () => {
  ul.remove(list)
})

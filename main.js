fetch('https://ghibliapi.herokuapp.com/films')
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    console.log(response)
    getFilms(response);
  });


const getFilms = (response) => {
    const titles = document.getElementById('titles')

    response.forEach((film) => {
        const option = document.createElement('option');
        option.setAttribute('value', film.id);
        option.textContent = film.title;
        titles.append(option);
    });

    titles.addEventListener('change', (event) => {
        event.preventDefault();
        const match = response.find((film) => film.id === event.target.value);

        const title = document.getElementById('title');
        const year = document.getElementById('year');
        const description = document.getElementById('description');

        title.textContent = match.title;
        year.textContent = match.release_date;
        description.textContent = match.description;

    fetch(`https://ghibliapi.herokuapp.com/films/${titles.value}`)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            let film = response.people
            for (let people of film){
                fetch(`${people}`)
                .then((response) => {
                    return response.json();
                  })
                  .then((response) => {
                    getPeople(response.name)
                  });
            }
        });

    });
};

const getPeople = (response) => {
    const name = document.createElement('li')
    name.textContent = response

    const peopleButton = document.getElementById("show-people")

    peopleButton.addEventListener('click', (event) => {
        event.preventDefault()
        const listOfPeople = document.querySelector('ol')
        listOfPeople.append(name)
    })
}

const reviewForm = document.querySelector('form')

reviewForm.addEventListener('submit', (event) => {
    event.preventDefault()
    if (!title.textContent){
        alert("Please select a movie first")
    } else {
        const text = document.getElementById('review')
        const reviewList = document.querySelector('ul')
        const review = document.createElement('li')
        
        review.innerHTML = `<strong>${title.textContent}: </strong><span>${text.value}</span>`
        reviewList.append(review)
    }
    reviewForm.reset()
})

const resetButton = document.getElementById('reset-reviews')

resetButton.addEventListener('click', (event) => {
    event.preventDefault()
    const reviewList = document.querySelector('ul')
    reviewList.innerHTML = ''
})
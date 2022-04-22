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

        const reviewForm = document.querySelector('form')

        reviewForm.addEventListener('submit', (event) => {
            event.preventDefault()
            const text = document.getElementById('review')
            if (!titles.value){
                window.alert("Please select a movie first") 
            } else if (!text.value){
                window.alert("Please write a review first")
            } else {
                const reviewList = document.querySelector('ul')
                const review = document.createElement('li')
                
                review.innerHTML = `<strong>${title.textContent}: </strong><span>${text.value}</span>`
                reviewList.append(review)
                reviewForm.reset()
            }
        })

    fetch(`https://ghibliapi.herokuapp.com/films/${titles.value}`)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            const listOfPeople = document.querySelector('ol')
            listOfPeople.innerHTML = ''
            let people = response.people
            for (let person of people){
                fetch(`${person}`)
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
    const listOfPeople = document.querySelector('ol')
    const name = document.createElement('li')
    const error = document.createElement('p')

    if (response){
        name.textContent = response
        name.setAttribute('style', 'display:none')
        listOfPeople.append(name)
    } else {
        error.textContent = "The list of people for this film has not been added."
        error.setAttribute('style', 'display:none')
        listOfPeople.append(error)
    }

    const peopleButton = document.getElementById("show-people")

    peopleButton.addEventListener('click', (event) => {
        event.preventDefault()
        error.removeAttribute('style')
        name.removeAttribute('style')
    })
}


const resetButton = document.getElementById('reset-reviews')

resetButton.addEventListener('click', (event) => {
    event.preventDefault()
    const reviewList = document.querySelector('ul')
    reviewList.innerHTML = ''
})
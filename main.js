//keep going jyoti!//

const base_URL='https://ghibliapi.herokuapp.com/films/';
let h3Title = document.querySelector("h3");
let pYear = document.getElementById ("year");
let pDesc = document.getElementById ("description");
let movies = document.getElementById ("titles");

function getTitles(movies) {
    let title = new set ();
    for (let movie of movies) {
        title.add(movie.title);
    }
    const dropdown = document.getElementById("titles")
    
    for(let title of titles) {
        const option = document.createElement("option");
        option.textContent = titles;
        option.value = titles;

        dropdown.append(option);

        movies.addEvenListener('click',function () {
            h3Title.innerHTML = getTitles.release_date;
        });
    }
    return [...title];
}
fetch("https://ghibliapi.herokuapp.com/films/")
.then((response) => response.json())
.then ((json) => {
    getTitles(json);
})
.catch((error) => console.log(error));
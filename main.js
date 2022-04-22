const movies_URL = "https://ghibliapi.herokuapp.com/films/";
const ppl_URL = "https://ghibliapi.herokuapp.com/people/";
const dropdownMenu = document.getElementById("movie-dropdown");
const displayInfo = document.getElementById('display-info');
const ul = document.querySelector('ul');
const showPeople = document.getElementById('show-people');
const form = document.querySelector('form');

fetch(movies_URL)
  .then((res) => res.json())
  .then((movies) => {
      getMovieInfo(movies);
reviewInfo (movies);
  })
  .catch((e) => {
    console.log(e);
  });

const getMovieInfo = (movies) => {
  movies.forEach((movie) => {
    const option = document.createElement("option");
    option.value = movie.id;
    option.textContent = movie.title;
    dropdownMenu.append(option);
  });
  dropdownMenu.addEventListener('change', (event) => {
      const movieId= event.target.value;

      for (let movie of movies){

          if( movieId === movie.id){
              info.textContent= '';
              const h3 = document.createElement('h3');
              displayInfo.prepend('h3');
              h3.textContent = movie.title;
              

              const pOne = document.createElement('p');
              info.append(pOne);
              pOne.textContent = movie.release_date;


              const p2 = document.createElement('p');
              info.append(p2);
          }
        };
    });

}
    //    function reviewInfo (people)  {
    //         // people.forEach ((person) =>{
    //             form.addEventListener('sumbit', (event) => {
    //                 event.preventDefault();
    //                const reviews = document.getElementById ('review').value;
    //                if (dropdownMenu.value === ''){
    //                    console.log('Select a Movie')
    //                }else {
    //                }
                   
        
       
    //    ;
    
    
                // ordered = document.createElement ('ol');
                // ordered.textContent = person.name;
                // ul.append(ordered)
  



    //    
    





let BASE_URL = 'https://ghibliapi.herokuapp.com/films/'; //API Link for Movies
let PEOPLE_URL = 'https://ghibliapi.herokuapp.com/people/'//API Link for People (Characters)

//A list of created variables used to house HTML elements
let dropdown = document.getElementById('title')
let peopleButton = document.getElementById('show-people')
let peopleNames = document.querySelector('ol')
let ul = document.querySelector('ul')
let info = document.getElementById('display-info')
let reviewForm = document.querySelector('form')

fetch(BASE_URL) //fetching the api
        .then((response) => response.json())
        .then((json) => { //and storing the promised response 
          for (let e of json) { //A loop is created to loop through every entry of the json
            const option = new Option(e.title, e.title); //An option element is created, which will hold two text values (entry.title)
            option.textContent = e.title;//Populating its content with the movie title
            option.value = e.id;//and with the movie ID, a string of numbers and letters
            dropdown.append(option); //This new option is appended onto my dropdown variable
            dropdown.addEventListener('change', (event) => {// and an event listener for 'change' is added to activate when the dropdown is clicked
                event.preventDefault();//prevents the page from refreshing every entry
                const chosenID = event.target.value//Creating a variable to store our target value
                for (let movie of json) { //Looping through the json data again to help match movie IDs to given IDs
                  if (chosenID === movie.id) { //Should the IDs be equal, we will create several elements containing the text relevant to the movie desc, date, and title
                  info.textContent = ''
                  const h3 = document.createElement('h3');
                  info.prepend(h3);
                  h3.textContent = movie.title;

                  const p1 = document.createElement('p');
                  info.append(p1)
                  p1.textContent = movie.release_date;

                  const p2 = document.createElement('p');
                  info.append(p2)
                  p2.textContent = movie.description;
                  }
                }
                peopleButton.addEventListener('click', (event) => { //An event listener is made for our show people button, to execute code when it is clicked
                  event.preventDefault() //preventing page refreshing
                  fetch(PEOPLE_URL) //fetching the api & storing the json
                  .then((response) => response.json())
                  .then((people) => {
                    people.innerHTML = '';//then, with the people gathered from the people API, we clear the query first
                    for (let person of people) { //then begin looping through each individual of the people object
                      for (let film of person.films) { //for every film found in person.films
                        if (film === `${BASE_URL}${chosenID}`) { //Create a list, populate it with the relevant interpolated URL and ID, and append it to our peopleNames variable (an ol). This will create a list, but prevent lists from stacking
                          let personList = document.createElement('li');
                          personList.textContent = person.name
                          peopleNames.append(personList)
                        }
                      }
                    }
                  })
                }) 
            })
          }
          getReviews(json); //calling function in the relevant code block for it to run
        })
        .catch((error) => { //should any of the above .thens carry an error, it will be logged out 
            console.log(error);
          });


//Function - getReviews: A helper function that recieves just one parameter, which is an object (json). It will listen for a submission button click, and log the users review input onto the page. An alert window is added to prevent the page from running anything if the user has not inputted a movie first. The final step is appending the listed elements of the movie (an interpolated string) to our created unorderedlist and resetting the review form each time it is called so as to prevent page clutter.          
function getReviews(json) { 
  reviewForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let reviewInput = document.getElementById('review').value;
    if (dropdown.value === '') {
      alert('Please select a movie first');
    } else {
      let movie = json.find((movie) => movie.id === dropdown.value);
      let li = document.createElement('li');
      li.innerHTML = `<strong>${movie.title}:</strong>${reviewInput}`;
      ul.append(li)
    }
    reviewForm.reset()
  })
}

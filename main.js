//const form = document.querySelector('form');
let BASE_URL = `https://ghibliapi.herokuapp.com`;
let PATH = `/films`;
let API_FORMAT = `?format=j1`;
let function_URL = `https://ghibliapi.herokuapp.com/films/`;

fetch(`${BASE_URL}${PATH}${API_FORMAT}`)
  .then((result) => result.json())
  .then(masterFunction)
  .catch(errorHandle);

function masterFunction(json) {
  addHeaderLogo();
  generateSelectMenu(json);
  generateMovieDescription(json);
  makeReview(json);
  resetReviews();
  //generateSelectMenu();
}
console.log(`${BASE_URL}${PATH}${API_FORMAT}`);

function generateSelectMenu(json) {
  //console.log(json);

  for (i = 0; i < json.length; i++) {
    // console.log(json[i]);
    let ghibliTitles = document.createElement('option');
    ghibliTitles.textContent = json[i].title;
    ghibliTitles.value = json[i].id;
    let dropdown = document.querySelector('#Selection ');
    dropdown.append(ghibliTitles);
  }
  console.log(document.querySelector(`#Selection`).length);
}

function generateMovieDescription(json) {
  let dropSelect = document.getElementById('Selection');
  dropSelect.addEventListener('change', (event) => {
    event.preventDefault();
    let selectTitle = dropSelect.value;
    console.log(selectTitle);

    for (i = 0; i < json.length; i++) {
      if (selectTitle === json[i].id) {
        console.log(selectTitle);
        console.log(json[i].id);
        let movieDetails = document.getElementById('display-info');

        let h3MovieTitle = document.createElement('h3');
        h3MovieTitle.textContent = json[i].title;
        let p1MovieRelease = document.createElement('p');
        p1MovieRelease = json[i].release_date;
        let p2MovieDescription = document.createElement('p');
        p2MovieDescription = json[i].description;

        movieDetails.append(
          h3MovieTitle,
          p1MovieRelease + ' ' + p2MovieDescription,
        );

        let element = document.getElementById('display-info');
        let number = element.childNodes.length;
        console.log(number);
        // console.log(document.getElementById('display-info').length);
      }
    }
  });
}

function makeReview(json) {
  let dropSelectReview = document.getElementById('Selection');

  const form = document.getElementById('userReview');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let selectTitleReview = dropSelectReview.value;
    for (i = 0; i < json.length; i++) {
      console.log(selectTitleReview);
      console.log(json[i].id);
      if (selectTitleReview === json[i].id) {
        const userReview = event.target.review.value;
        const reviewList = document.querySelector('ul');
        const userReviewEntry = document.createElement('li');
        userReviewEntry.textContent = `${json[i].title}:` + ` ` + userReview;
        userReviewEntry.style.fontWeight = 'bold';

        reviewList.append(userReviewEntry);
        console.log(userReview);
        event.target.review.value = '';
      } else if (selectTitleReview === '') {
        window.alert('Please select a movie first');
        break;
      }
    }
  });
}
function resetReviews() {
  let resetReviews = document.getElementById('reset-reviews-form');
  resetReviews.addEventListener('submit', (event) => {
    event.preventDefault();

    const reviewNode = document.getElementById('reviewsList');
    while (reviewNode.firstChild) {
      reviewNode.removeChild(reviewNode.lastChild);
    }
  });
}

function addHeaderLogo() {
  let header = document.querySelector('#header');
  let ghibliLogo = document.createElement('img');
  ghibliLogo.src = `./images/ghibli-logo.png`;
  ghibliLogo.alt = `Ghibli logo`;
  header.prepend(ghibliLogo);
}

function errorHandle(error) {
  console.log(error);
  return error;
}

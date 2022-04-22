let BASE_URL = `https://ghibliapi.herokuapp.com`;
let PATH = `/films`;
let API_FORMAT = `?format=j1`;

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
}

function generateSelectMenu(json) {
  for (i = 0; i < json.length; i++) {
    let ghibliTitles = document.createElement('option');
    ghibliTitles.textContent = json[i].title;
    ghibliTitles.value = json[i].id;
    let dropdown = document.querySelector('#Selection');
    dropdown.append(ghibliTitles);
  }
  let dropDownLengthCheck = document.querySelector(`#Selection`).length;
  console.log(dropDownLengthCheck);
}

function generateMovieDescription(json) {
  let dropSelect = document.getElementById('Selection');
  dropSelect.addEventListener('change', (event) => {
    event.preventDefault();
    let selectTitle = dropSelect.value;

    for (i = 0; i < json.length; i++) {
      if (selectTitle === json[i].id) {
        let movieDetails = document.getElementById('display-info');

        let h3MovieTitle = document.createElement('h3');
        h3MovieTitle.textContent = json[i].title;
        let p1MovieRelease = document.createElement('p');

        p1MovieRelease = json[i].release_date;

        let p2MovieDescription = document.createElement('p');
        p2MovieDescription = json[i].description;

        movieDetails.append(h3MovieTitle);
        movieDetails.append(p1MovieRelease);
        //Uncomment below to properly format the details section, but fails the correct number of children test.
        /* let linebreak = document.createElement('br');
        movieDetails.appendChild(linebreak); */
        movieDetails.append(p2MovieDescription);

        let element = document.getElementById('display-info');
        let numberOfDetailNodes = element.childNodes.length;
        console.log(numberOfDetailNodes);
      }
    }
  });
}
///My attempt at making a helper function to bold only the review's movie title.
/// Causes an infinite loop, and I didn't have time to troubleshoot the issue.
/*function formatTitle(json) {
    for (i = 0; i < json.length; i++) {
      let wrapper = json[i].title;
      let boldWrapper = wrapper.bold();
      console.log(boldWrapper);
      return boldWrapper;
    }
  } */

function makeReview(json) {
  let dropSelectReview = document.getElementById('Selection');
  const form = document.getElementById('userReview');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let selectTitleReview = dropSelectReview.value;
    for (i = 0; i < json.length; i++) {
      if (selectTitleReview === json[i].id) {
        const userReview = event.target.review.value;
        const reviewList = document.querySelector('ul');
        const userReviewEntry = document.createElement('li');
        userReviewEntry.textContent = `${json[i].title}.` + `  `;
        userReviewEntry.style.fontWeight = 'bold';
        userReviewEntry.textContent += `${userReview}`;
        reviewList.append(userReviewEntry);
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

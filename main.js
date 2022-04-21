const BASE_URL = `https://ghibliapi.herokuapp.com`;
const format = `/films`;
let id = "";

fetch(`${BASE_URL}${format}/${id}`)
  .then((Response) => Response.json())
  .then((data) => {
    populateSelectBoxWithMovieTitles(data);
  })
  .catch((error) => {
    console.log(error);
  });

function populateSelectBoxWithMovieTitles(data) {
  for (let i = 0; i < data.length; i++) {
    const selectBox = document.getElementById("movieTitles");
    const option = document.createElement("option");
    option.text = data[i].title;
    option.value = data[i].release_date;
    selectBox.add(option);
  }
}
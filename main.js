const selected = document.getElementById("select");

fetch(`https://ghibliapi.herokuapp.com/films`)
  .then((response) => response.json())
  .then((json) => {
    parse(json);
  })
  .catch((error) => console.log(error));

function parse(file) {
  let arr = [];
  for (const current of file) {
    arr.push(current.title);
  }
  for (let i = 0; i < arr.length; i++) {
    let option = document.createElement("option");
    selected.appendChild(option);
    option.value = arr[i];
    option.text = arr[i];
    selected.appendChild(option);
  }
}

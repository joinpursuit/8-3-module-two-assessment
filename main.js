//const allTitles = `https://ghibliapi.herokuapp.com/films`;
fetch("https://ghibliapi.herokuapp.com/films")
  .then((response) => response.json())
  .then((films) => {
    let dropDown = document.querySelector("#titles");
    for (let film of films) {
      const option = document.createElement("option");
      option.setAttribute("value", film.title);
      option.textContent = film.title;
      dropDown.append(option);

      if (dropDown.value === film.title) {
        fetch("https://ghibliapi.herokuapp.com/people")
          .then((response) => response.json())
          .then((person) => {
            document
              .getElementById("show-people")
              .addEventListener("click", (e) => {
                e.preventDefault();
                for (people of person) {
                  console.log(people.id);
                  if (people.id === film.id) {
                    let person = people.name;
                    const li = document.createElement("li");
                    //                    li.setAttribute("value", people.name);
                    //                    li.textContent = people.name;
                    li.innerHTML = `${person}`;
                    ol.append(li);
                  }
                }
              });
          });
      }

      dropDown.addEventListener("change", () => {
        for (let film of films) {
          if (dropDown.value === film.title) {
            console.log(film.title);
            let displayYear = document.querySelector("#display-info");
            let name = film.title;
            let year = film.release_date;
            let description = film.description;
            displayYear.innerHTML = `<h3>${name}</h3><p>${year}</p><p>${description}</p>`;
          }
          if (!dropDown.value) {
            alert("Please select a movie first");
          }
        }
      });
    }
    let form = document
      .querySelector("form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        const userInput = event.target.review.value;
        const ul = document.querySelector("ul");
        const li = document.createElement("li");
        for (let film of films) {
          if (dropDown.value === film.title) {
            li.innerHTML = `<strong><b>${film.title}</strong>:</b> ${userInput}`;
            ul.append(li);
            document.querySelector("form").reset();
          }
        }
      });
  });

//console.log(titleId);

// fetch("https://ghibliapi.herokuapp.com/people")
//   .then((response) => response.json())
//   .then((people) => {
//     let dropDown = document.querySelector("#titles");

//     document.getElementById("show-people").addEventListener("click", () => {
//       for (let person of people) {
//         if (dropDown.value === person.title && person.id === person.id) {
//           const li = document.createElement("li");
//           li.setAttribute("value", people.name);
//           li.textContent = people.name;
//           ol.append(li);
//         }
//       }
//     });
//   });
//   .then((response) => response.json())
//   .then((displayYear) => {

//   })
//   .then((displayDescription) => {
//       let displayDescription = document.querySelector("p");

//   })

// dropDown.addEventListener(("click", e) => {

// }

//   .catch (error) {
//     console.error(error);
//

fetch("https://ghibliapi.herokuapp.com/films")
    .then((res) => res.json())
    .then((films) => {
    

    const dropDown = document.querySelector("#dropdown");

    for (const film of films) {
        const option = document.createElement("option");
        option.textContent = film.title;
        option.setAttribute("value", film.title);
        dropDown.append(option);
    }
})
.catch((err) => {
console.log(err);
});

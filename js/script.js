// Por el momento voy a dejar este array (acotado) hasta que veamos lo de AJAX
// Igualmente, ya tengo armado un .json con las peliculas
const PELICULAS = [
  { titulo: "Star Wars: A New Hope", genero: "Ciencia Ficcion", precio: 100 },
  { titulo: "Top Gun", genero: "Drama", precio: 100 },
  { titulo: "Scarface", genero: "Accion", precio: 100 },
  { titulo: "Back to the Future", genero: "Ciencia Ficcion", precio: 100 },
];

// Crea los tags li para la lista del HTML
function crearListaPeliculas() {
  let padre = document.querySelector("#peliculas__lista");
  for (const pelicula of PELICULAS) {
    let li = document.createElement("li");
    li.innerHTML = pelicula.titulo;
    padre.appendChild(li);
  }
  pedirUnaPelicula();
}

function pedirUnaPelicula() {
  let userInput = document.querySelector("#userInput");
  console.log(userInput.value);
}

crearListaPeliculas();

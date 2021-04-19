// Por el momento voy a dejar este array (acotado) hasta que veamos lo de AJAX
// Igualmente, ya tengo armado un .json con las peliculas
const PELICULAS = [
  { titulo: "Star Wars: A New Hope", genero: "Ciencia Ficcion", precio: 100 },
  { titulo: "Top Gun", genero: "Drama", precio: 100 },
  { titulo: "Scarface", genero: "Accion", precio: 100 },
  { titulo: "Back to the Future", genero: "Ciencia Ficcion", precio: 100 },
];

// Crea los tags li para la lista del HTML
// A cada uno de estos li le asigno un id distinto
function crearListaPeliculas() {
  let padre = document.querySelector("#peliculas__lista");
  let childId = 1;
  for (const pelicula of PELICULAS) {
    let li = document.createElement("li");
    li.innerHTML = pelicula.titulo;
    li.id = `pelicula${childId}`;
    padre.appendChild(li);
    childId += 1;
  }
}

// Pide al usuario su nombre y agrega un header con un saludo personalizado
function saludarUsuario() {
  let nombre = prompt("Ingrese su nombre");
  let padre = document.querySelector(".container-fluid");
  let h1 = document.createElement("h1");
  h1.innerHTML = `¡Bienvenido ${nombre}!`;
  h1.id = "saludo";
  padre.prepend(h1); // Agrego el h1 arriba de la lista
}

saludarUsuario();
crearListaPeliculas();

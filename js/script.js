// Por el momento voy a dejar este array (acotado) hasta que veamos lo de AJAX
// Igualmente, ya tengo armado un .json con las peliculas
const PELICULAS = [
  { titulo: "Star Wars: A New Hope", genero: "Ciencia Ficcion", precio: 100 },
  { titulo: "Top Gun", genero: "Drama", precio: 100 },
  { titulo: "Scarface", genero: "Accion", precio: 100 },
  { titulo: "Back to the Future", genero: "Ciencia Ficcion", precio: 100 },
];

// Funcion para poder conseguir el numero de id de tag pasado por parametro
const getIdNumber = (tagId) => tagId.charAt(tagId.length - 1);

// Funcion para agregar a localStorage el carrito del cliente
const agregarALocalStorage = (carrito) => {
  localStorage.setItem(
    "carrito",
    JSON.stringify(carrito.elementosDentroDeCarrito())
  );
};

class Carrito {
  #totalAPagar;

  constructor() {
    this.enCarrito = [];
    this.#totalAPagar = 0;
  }

  sumarACarrito(pelicula) {
    if (!this.enCarrito.includes(pelicula)) {
      this.enCarrito.push(pelicula);
      //this.#sumarATotal(pelicula.obtenerPrecio());
    } else {
      alert("¡No puede alquilar mas de una vez la misma pelicula!");
    }
  }

  #sumarATotal(precio) {
    this.#totalAPagar += precio;
  }

  totalCarrito() {
    return this.#totalAPagar;
  }

  elementosDentroDeCarrito() {
    return this.enCarrito;
  }
}

class Pelicula {
  constructor(titulo, genero, precio) {
    this.titulo = titulo;
    this.genero = genero;
    this.precio = parseFloat(precio);
  }

  obtenerPrecio() {
    return this.precio;
  }
}

var carrito = new Carrito();
/* Evento cuando el usuario hace click en uno de los botones para alquilar */
document
  .querySelector(".container-fluid")
  .addEventListener("click", function (e) {
    let listaPeliculas = document.querySelectorAll(
      ".peliculas__tituloPelicula"
    );
    for (const pelicula of listaPeliculas) {
      if (getIdNumber(e.target.id) == getIdNumber(pelicula.id)) {
        // Le aplico trim porque me estaba guardando el string con espacios
        // generador por la extension de prettier en vscode
        carrito.sumarACarrito(pelicula.textContent.trim());
      }
    }
    agregarALocalStorage(carrito);
  });

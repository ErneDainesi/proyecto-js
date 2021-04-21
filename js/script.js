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

// Funcion para recuperar la lista de los elementos dentro del carrito
const recuperarCarritoDeLocalStorage = () => {
  return JSON.parse(localStorage.getItem("carrito"));
};

class Carrito {
  constructor() {
    this.enCarrito = [];
  }

  sumarACarrito(pelicula) {
    if (!this.enCarrito.includes(pelicula)) {
      this.enCarrito.push(pelicula);
    } else {
      alert("¡No puede alquilar mas de una vez la misma pelicula!");
    }
  }

  elementosDentroDeCarrito() {
    return this.enCarrito;
  }
}

// Crea boton para ver contenido dentro del carrito
function generarBotonCarrito() {
  let padre = document.querySelector("#row1");
  let btn = document.createElement("button");
  btn.id = "verCarritoBtn";
  btn.innerHTML = "Ver Carrito";
  btn.className = "btn btn-success";
  padre.insertAdjacentElement("afterend", btn);
}

// Lanza un alert con los elementos dentro del carrito cuando se aprieta el boton "Ver Carrito"
function crearEventoParaBotonCarrito() {
  document
    .querySelector("#verCarritoBtn")
    .addEventListener("click", function () {
      alert(recuperarCarritoDeLocalStorage().join(", "));
    });
}

var carrito = new Carrito();

/* Evento cuando el usuario hace click en uno de los botones para alquilar */
// Se agrega la pelicula elegida a la lista del carrito
// Si el carrito tiene 1 elemento o menos, se crea el boton para ver el contenido dentro del carrito
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
    if (
      recuperarCarritoDeLocalStorage().length <= 1 &&
      e.target.id != "verCarritoBtn"
    ) {
      generarBotonCarrito();
      crearEventoParaBotonCarrito();
    }
  });

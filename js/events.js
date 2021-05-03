const getIdNumber = (tagId) => tagId.charAt(tagId.length - 1);

const recuperarCarritoDeLocalStorage = () => {
  return JSON.parse(localStorage.getItem("carrito"));
};

// Por el momento voy a dejar este array (acotado) hasta que veamos lo de AJAX
// Igualmente, ya tengo armado un .json con las peliculas
const PELICULAS = [
  new Pelicula("Star Wars: A New Hope", "Ciencia Ficcion", 100),
  new Pelicula("Top Gun", "Drama", 100),
  new Pelicula("Scarface", "Accion", 100),
  new Pelicula("Back to the Future", "Ciencia Ficcion", 100),
];

var carrito = new Carrito();

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
      let listado = [];
      for (pelicula of recuperarCarritoDeLocalStorage()) {
        listado.push(pelicula.titulo);
      }
      alert(
        `${listado.join(", ")}\nEl total a abonar es $${carrito.totalCarrito()}`
      );
    });
}

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
        carrito.sumarACarrito(pelicula.textContent.trim());
        break; // hago esto para que una vez que encuentre la pelicula, deje de recorrer la lista. De esta manera, es un poco mas eficiente.
      }
    }
    carrito.agregarALocalStorage();
    if (
      recuperarCarritoDeLocalStorage().length <= 1 &&
      e.target.id != "verCarritoBtn"
    ) {
      generarBotonCarrito();
      crearEventoParaBotonCarrito();
    }
  });

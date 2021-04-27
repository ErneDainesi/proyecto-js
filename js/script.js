class Pelicula {
  constructor(titulo, genero, precio) {
    this.titulo = titulo;
    this.genero = genero;
    this.precio = precio;
  }

  peliculaTitulo() {
    return this.titulo;
  }

  peliculaGenero() {
    return this.genero;
  }

  peliculaPrecio() {
    return this.precio;
  }
}

class Carrito {
  constructor() {
    this.enCarrito = [];
    this.total = 0;
  }

  sumarACarrito(nombrePelicula) {
    for (const objPelicula of PELICULAS) {
      if (
        nombrePelicula == objPelicula.peliculaTitulo() &&
        !this.enCarrito.includes(objPelicula)
      ) {
        this.enCarrito.push(objPelicula);
        this.total += objPelicula.peliculaPrecio();
      } else if (
        nombrePelicula == objPelicula.peliculaTitulo() &&
        this.enCarrito.includes(objPelicula)
      ) {
        alert("¡No se puede alquilar mas de una vez la misma pelicula!");
      }
    }
  }

  elementosDentroDeCarrito() {
    return this.enCarrito;
  }

  totalCarrito() {
    return this.total;
  }
}

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
    agregarALocalStorage(carrito);
    if (
      recuperarCarritoDeLocalStorage().length <= 1 &&
      e.target.id != "verCarritoBtn"
    ) {
      generarBotonCarrito();
      crearEventoParaBotonCarrito();
    }
  });

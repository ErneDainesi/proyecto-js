const MOVIES = [
  new Movie("Star Wars: A New Hope", "scienceFiction", 100),
  new Movie("Top Gun", "drama", 100),
  new Movie("Scarface", "action", 100),
  new Movie("Back to the Future", "scienceFiction", 100),
];

var cart = new Cart();

// Funcion para obtener numero de id, para luego usar para comparar
const getIdNumber = (tagId) => tagId.charAt(tagId.length - 1);

// Funcion para recuperar el contenido del carrito del LocalStorage
const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart"));
};

// Funcion para agregar el contenido del carrito al LocalStorage
const addToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Manejo de evento para cerrar el modal que se abre al ver el carrito
$("#closeModalBtn").click(() => {
  $(".modal").hide();
});

// Manejo de evento para abrir el modal que muestra el contenido del carrito
function eventHandlerForCartButton() {
  $("#verCarritoBtn").click(() => {
    $(".modal").fadeIn();
  });
}

// Funcion para crear el boton del carrito
function createCartButton() {
  $(
    '<button class="btn btn-success" id="verCarritoBtn">Cart</button>'
  ).insertAfter("#row1");
}

// Evento cuando el usuario hace click en uno de los botones para alquilar
// Se agrega la pelicula elegida a la lista del carrito
// Si el carrito tiene un elemento o menos, se crea el boton para ver el contenido dentro del carrito
$("#moviesContainer").on("click", (e) => {
  let movieList = $(".peliculas__tituloPelicula");
  for (const movie of movieList) {
    if (
      $(e.target).hasClass("btn") &&
      getIdNumber(e.target.id) == getIdNumber(movie.id)
    ) {
      cart.addToCart(movie.textContent.trim());
      e.target.className = "btn btn-danger disabled";
      e.target.textContent = "Rented";
      break; // hago esto para que una vez que encuentre la pelicula, deje de recorrer la lista. De esta manera, es un poco mas eficiente.
    }
  }
  addToLocalStorage(cart.cartProducts());
  if (getCartFromLocalStorage().length <= 1 && e.target.id != "verCarritoBtn") {
    createCartButton();
    eventHandlerForCartButton();
  }
});

// Event delegation para filtrar las peliculas por genero
// Observacion: esta parte del codigo creo que podria mejorarla, pero
// hasta el momento, no se me ocurrio una buena manera de hacerlo
$("#filterButtonsContainer").on("click", (e) => {
  switch (e.target.id) {
    case "action":
      $(".peliculas__action").fadeIn();
      $(".peliculas__drama").hide();
      $(".peliculas__scienceFiction").hide();
      break;

    case "drama":
      $(".peliculas__action").hide();
      $(".peliculas__drama").fadeIn();
      $(".peliculas__scienceFiction").hide();
      break;

    case "scienceFiction":
      $(".peliculas__action").hide();
      $(".peliculas__drama").hide();
      $(".peliculas__scienceFiction").fadeIn();
      break;

    case "all":
      $(".peliculas__action").fadeIn();
      $(".peliculas__drama").fadeIn();
      $(".peliculas__scienceFiction").fadeIn();
      break;

    default:
      break;
  }
});

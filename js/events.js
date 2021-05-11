const URLJSON = "./peliculas.json";
const MOVIES = [];

var cart = new Cart();

// Funcion para obtener numero de id, para luego usar para comparar
const getIdNumber = (tagId) => tagId.slice(6);

// Funcion para recuperar el contenido del carrito del LocalStorage
const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart"));
};

// Funcion para agregar el contenido del carrito al LocalStorage
const addToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Elimina la pelicula pasada por parametro del array que se encuentra en LocalStorage
// y se actualiza el contenido dentro de local Storage
const removeMovieFromLocalStorage = (movieId) => {
  let localStorageContent = getCartFromLocalStorage();
  for (movie of localStorageContent) {
    if (movie.idNumber == movieId) {
      let index = localStorageContent.indexOf(movie);
      localStorageContent.splice(index, 1);
    }
  }
  addToLocalStorage(localStorageContent);
};

// Inserta una nueva fila al DOM y devuelve su id
function insertNewRow(rowNumber, moviesContainer) {
  moviesContainer.append(`
      <div class="peliculas" id="movie-row-${rowNumber}"></div>
  `);
  return `#movie-row-${rowNumber}`;
}

// Inserta una pelicula a la fila pasada por parametro
function appendMovieToRow(movie, rowId, idNumber) {
  $(rowId).append(`
      <div class="card shadow peliculas__pelicula ${movie.movieGenre()}" id="m-btn-${idNumber}" style="width: 18rem;">
        <img src="${movie.movieImage()}" alt="${movie.movieTitle()}" class="card-img-top" id="${movie.movieTitle()}">
        <div class="card-body">
          <h5 class="card-title peliculas__tituloPelicula">${movie.movieTitle()}</h5>
          <button class="btn btn-secondary rent-btn" id="r-btn-${idNumber}">Rent</button>
        </div>
      </div>`);
}

// Proceso para generar el listado de peliculas de la pagina
// A partir de peliculas.json, se sacan los datos de cada pelicula y se crean
// cards con imagen, titulo y un boton de compra.
$.getJSON(URLJSON, (data) => {
})
  .done((data) => {
    let rowNumber = 0;
    let moviesContainer = $("#moviesContainer");
    let currentRowId;
    for (let i = 0; i < data.length; i++) {
      if (i % 4 == 0) {
        // Si ya inserté 4 peliculas en una fila, voy a la siguiente fila
        rowNumber += 1;
        currentRowId = insertNewRow(rowNumber, moviesContainer);
      }
      let movie = new Movie(data[i]);
      appendMovieToRow(movie, currentRowId, movie.movieIdNumber());
      MOVIES.push(movie);
    }
  })
  .fail(() => {
    console.log("error");
  })
  .always(() => {
    console.log("complete");
  });

// Manejo de evento para cerrar el modal que se abre al ver el carrito
$("#closeModalBtn").click(() => {
  $(".modal").hide();
});

// Manejo de evento para abrir el modal que muestra el contenido del carrito
function eventHandlerForCartButton() {
  $("#verCarritoBtn").click(() => {
    $("#cart-total").text(`$${cart.cartTotal()}`);
    $(".modal").fadeIn();
  });
}

// Evento para retirar un elemento del carrito
$(".cart-modal").click((e) => {
  let moviesList = $(".cart-modal .modal-content .card");
  let targetId = getIdNumber(e.target.id);
  for (movie of moviesList) {
    let movieId = getIdNumber(movie.id);
    if (targetId == movieId) {
      cart.remove(movieId);
      removeMovieFromLocalStorage(movieId);
    }
  }
});

// Funcion para crear el boton del carrito
function createCartButton() {
  $(
    '<button class="btn btn-success" id="verCarritoBtn">Cart</button>'
  ).insertAfter("#moviesContainer");
}

// Agrega la pelicula al carrito e inhabilita el boton para
// que no se pueda volver a elegir la misma pelicula
function rentMovie(cart, eventTarget, movieIdNumber) {
  cart.addToCart(movieIdNumber);
  eventTarget.className = "btn btn-danger disabled rent-btn";
  eventTarget.textContent = "Rented";
}

// Evento cuando el usuario hace click en uno de los botones para alquilar
// Se agrega la pelicula elegida a la lista del carrito
// Si el carrito tiene un elemento o menos, se crea el boton para ver el contenido dentro del carrito
$("#moviesContainer").on("click", (e) => {
  let movieList = $(".peliculas__pelicula");
  let buttonIdNumber = getIdNumber(e.target.id);
  for (const movie of movieList) {
    let movieIdNumber = getIdNumber(movie.id);
    if ($(e.target).hasClass("btn") && buttonIdNumber == movieIdNumber) {
      rentMovie(cart, e.target, movieIdNumber);
      break; // hago esto para que una vez que encuentre la pelicula, deje de recorrer la lista. De esta manera, es un poco mas eficiente.
    }
  }
  addToLocalStorage(cart.cartProducts());
  if (
    getCartFromLocalStorage().length > 0 &&
    $(e.target).hasClass("rent-btn") &&
    $("#verCarritoBtn").length < 1
  ) {
    createCartButton();
    eventHandlerForCartButton();
  }
});

// Event delegation para filtrar las peliculas por genero
// Observacion: esta parte del codigo creo que podria mejorarla, pero
// hasta el momento, no se me ocurrio una buena manera de hacerlo
var filterBar = $("#filterButtonsContainer");

$("#filterButtonsContainer").on("click", (e) => {
  // BUSCAR INDEXOF
  switch (e.target.id) {
    case "action":
      $(".action").fadeIn();
      $(".drama").hide();
      $(".scienceFiction").hide();
      $(".adventure").hide();
      break;

    case "drama":
      $(".action").hide();
      $(".drama").fadeIn();
      $(".scienceFiction").hide();
      $(".adventure").hide();
      break;

    case "scienceFiction":
      $(".action").hide();
      $(".drama").hide();
      $(".scienceFiction").fadeIn();
      $(".adventure").hide();
      break;

    case "adventure":
      $(".action").hide();
      $(".drama").hide();
      $(".scienceFiction").hide();
      $(".adventure").fadeIn();
      break;

    case "all":
      $(".action").fadeIn();
      $(".drama").fadeIn();
      $(".scienceFiction").fadeIn();
      $(".adventure").fadeIn();
      break;

    default:
      break;
  }
});

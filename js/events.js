/***************************************************/
/********** CONSTANTES Y FUNCIONES FLECHA **********/
/***************************************************/

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


/*******************************************/
/********** FUNCIONES AUXILIARES **********/
/*****************************************/

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
          <div class="card-buttons">
            <button class="btn btn-secondary prev-btn" id="p-btn-${idNumber}">Preview</button>
            <button class="btn btn-secondary rent-btn" id="r-btn-${idNumber}">Rent</button>
          </div>
        </div>
      </div>`);
}


// Agrega la pelicula al carrito e inhabilita el boton para
// que no se pueda volver a elegir la misma pelicula
function rentMovie(cart, eventTarget, movieIdNumber) {
  cart.addToCart(movieIdNumber);
  eventTarget.className = "btn btn-danger disabled rent-btn";
  eventTarget.textContent = "Rented";
}

// Funcion para crear el boton del carrito
function createCartButton() {
  $(
    '<button class="btn btn-success" id="verCarritoBtn">Cart</button>'
  ).insertAfter("#moviesContainer");
}

// Funcion que rellena el modal del preview 
// de la pelicula donde va a estar
// el trailer y la sinopsis de la pelicula
function fillPreviewModal(movie, modal) {
  let modalChildren = `
      <div class="modal-dialog preview-modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${movie.movieTitle()}</h5>
            <button type="button" class="btn-close close-modal-btn prev-close-modal-btn" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <iframe width="460" height="230" src=${movie.movieVideoLink()} title="YouTube video player"
                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
            </iframe>
            <h6>Synopsis</h6>
            <p class="movie-synopsis">${movie.movieDescription()}</p>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary close-modal-btn prev-close-modal-btn" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
  `;
  modal.append(modalChildren);
}

// Funcion que maneja el evento cuando
// el usuario hace click en el boton "rent"
function rentEventHandler(e) {
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
}

// Funcion que maneja el evento cuando el usuario
// hace click en el boton preview de la pelicula
// Hay un unico modal, en el cual se muestra la
// informacion de la pelicula elegida
function previewEventHandler(e) {
  let modal = $(".preview-modal");
  let movieId = getIdNumber(e.target.id);
  for (movie of MOVIES) {
    if (movieId == movie.movieIdNumber()) {
      fillPreviewModal(movie, modal);
      break;
    }
  }
  modal.fadeIn();
}

/*************************************/
/********** AJAX Y EVENTOS **********/
/***********************************/


// Proceso para generar el listado de peliculas de la pagina
// A partir de peliculas.json, se sacan los datos de cada pelicula y se crean
// cards con imagen, titulo y un boton de compra y un boton de preview.
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
    // Mostrar mensaje de error
    $("#moviesContainer").append(`
        <div class="ajax-error-message">
          <i class="fas fa-exclamation-triangle"></i>
          <h1>Whoops! Something went wrong, try refreshing the page</h1>
        </div>
    `);
    console.log("error");
  });

// Manejo de evento para cerrar el modal que se abrio
// Si el modal es de un preview, se elimina el contenido de la pelicula elegida
$(".modal").click((e) => {
  let btn = $(e.target); if (btn.hasClass("close-modal-btn")) {
    $(".modal").hide();
    if (btn.hasClass("prev-close-modal-btn")) {
      $(".preview-modal-dialog").remove();
    }
  }
});

// Manejo de evento para abrir el modal que muestra el contenido del carrito
function eventHandlerForCartButton() {
  $("#verCarritoBtn").click(() => {
    $("#cart-total").text(`$${cart.cartTotal()}`);
    $(".cart-modal").fadeIn();
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

// Evento cuando el usuario hace click en uno de los botones de la pelicula
// Dependiendo si es el boton para alquilar o para ver una previa de la 
// pelicula, se ejecutan distintas acciones
$("#moviesContainer").on("click", (e) => {
  let eventTarget = $(e.target);
  if (eventTarget.hasClass("prev-btn")) {
    previewEventHandler(e);
  } else if (eventTarget.hasClass("rent-btn")) {
    rentEventHandler(e);
  }
});

// Le agrego esta clase al boton de all
// para que cuando cargue la pagina el usuario
// sepa que no tiene filtros

var lastFilter = $("#all");
lastFilter.addClass("btn-info");

// Event delegation para filtrar las peliculas por genero
$("#filterButtonsContainer").on("click", (e) => {
  if ($(e.target).hasClass("btn")) { // Actualizo el boton del filtro
    lastFilter.removeClass("btn-info");
    lastFilter = $(e.target);
    lastFilter.addClass("btn-info");
  }
  switch (e.target.id) {
    case "action":
      $(".drama").hide();
      $(".scienceFiction").hide();
      $(".adventure").hide();
      $(".action").fadeIn();
      break;

    case "drama":
      $(".scienceFiction").hide();
      $(".adventure").hide();
      $(".action").hide();
      $(".drama").fadeIn();
      break;

    case "scienceFiction":
      $(".adventure").hide();
      $(".action").hide();
      $(".drama").hide();
      $(".scienceFiction").fadeIn();
      break;

    case "adventure":
      $(".scienceFiction").hide();
      $(".action").hide();
      $(".drama").hide();
      $(".adventure").fadeIn();
      break;

    case "all":
      $(".scienceFiction").fadeIn();
      $(".action").fadeIn();
      $(".drama").fadeIn();
      $(".adventure").fadeIn();
      break;

    default:
      break;
  }
});

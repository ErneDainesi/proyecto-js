// Modulo donde implemento el Cart y sus metodos
class Cart {
  constructor() {
    this.insideCart = [];
    this.total = 0;
  }

  // Agrega la pelicula elegida al carrito y agrega un card al modal
  // para cuando se quiera ver el contenido del carrito
  addToCart(movieIdNumber) {
    for (const movieObject of MOVIES) {
      if (
        movieIdNumber == movieObject.movieIdNumber() &&
        !this.insideCart.includes(movieObject)
      ) {
        let movieCard = `
            <div class="card shadow mb-3" id="rmodal${movieObject.movieIdNumber()}" style="max-width: 540px;">
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="${movieObject.movieImage()}" alt="${movieObject.movieTitle()}" class="cart-image">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">${movieObject.movieTitle()}</h5>
                    <p>$${movieObject.moviePrice()}</p>
                    <button class="btn btn-danger btn-remove" id="rm-btn${movieObject.movieIdNumber()}">Remove</button>
                  </div>
                </div>
              </div>
            </div>
        `;
        $("#carritoList").append(movieCard);
        this.insideCart.push(movieObject);
        this.total += movieObject.moviePrice();
      }
    }
  }

  // Devuelve el array de productos del carrito
  cartProducts() {
    return this.insideCart;
  }

  // Devuelve el total de dinero que suman las peliculas dentro del carrito
  cartTotal() {
    return this.total;
  }

  // Remueve el elemento con el numero de id que se pasa por parametro
  // Cuando se remueve el elemento, el boton para alquilar vuelve a estar
  // activado. Si el carrito queda vacio, se elimina el boton para ver el
  // contenido del carrito y automaticamente se cierra el modal que muestra
  // el contenido del carrito
  remove(idNumber) {
    for (movie of this.insideCart) {
      if (movie.movieIdNumber() == idNumber) {
        let index = this.insideCart.indexOf(movie);
        this.insideCart.splice(index, 1);
        $(`#rmodal${idNumber}`).remove();
        let rentBtn = $(`#r-btn-${idNumber}`);
        rentBtn.removeClass("btn-danger disabled");
        rentBtn.addClass("btn-secondary");
        rentBtn.text("Rent");
        break;
      }
    }
    if (this.insideCart.length < 1) {
      $("#verCarritoBtn").remove();
      $("#cart-content-modal").fadeOut();
    }
  }
}

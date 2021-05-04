// Modulo donde implemento el Cart y sus metodos
class Cart {
  constructor() {
    this.insideCart = [];
    this.total = 0;
  }

  // Agrega la pelicula elegida al carrito y agrega un <li> al modal
  // para cuando se quiera ver el contenido del carrito
  addToCart(moviesName) {
    for (const movieObject of MOVIES) {
      if (
        moviesName == movieObject.movieTitle() &&
        !this.insideCart.includes(movieObject)
      ) {
        $("#carritoList").append(`<li>${moviesName}</li>`);
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
}

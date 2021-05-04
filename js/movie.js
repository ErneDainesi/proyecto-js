// Modulo para contener la clase de Movie, que voy a usar para modelar lo que son las peliculas
class Movie {
  constructor(title, genre, price) {
    this.title = title;
    this.genre = genre;
    this.price = price;
  }

  movieTitle() {
    return this.title;
  }

  movieGenre() {
    return this.genre;
  }

  moviePrice() {
    return this.price;
  }
}

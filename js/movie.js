// Modulo para contener la clase de Movie, que voy a usar para modelar lo que son las peliculas
class Movie {
  constructor({title, genre, price, image, idNumber, videoLink, movieSynopsis}) {
    this.title = title;
    this.genre = genre;
    this.price = price;
    this.image = image;
    this.idNumber = idNumber;
    this.videoLink = videoLink;
    this.movieSynopsis = movieSynopsis;
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

  movieImage() {
    return this.image;
  }

  movieIdNumber() {
    return this.idNumber;
  }

  movieVideoLink() {
    return this.videoLink;
  }

  movieDescription() {
    return this.movieSynopsis;
  }
}

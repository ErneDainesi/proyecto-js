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

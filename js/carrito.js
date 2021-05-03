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

  agregarALocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(this.enCarrito));
  }
}

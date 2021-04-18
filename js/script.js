const PELICULAS = [
  "Avengers",
  "Good Will Hunting",
  "The Trueman Show",
  "Mission: Impossible III",
  "Indiana Jones and the Last Crusade",
];

class Usuario {
  constructor(nombre, peliculas) {
    this.nombre = nombre;
    this.peliculas = peliculas;
  }

  peliculasDelUsuario() {
    return this.peliculas;
  }

  nombreDelUsuario() {
    return this.nombre;
  }
}

function preguntarNombre() {
  var nombre = prompt("Ingrese su nombre");
  return nombre;
}

function elegirPelicula() {
  var listaPelis = PELICULAS.join(", ");
  var pelicula = prompt("Eliga una de las siguientes peliculas: " + listaPelis);
  // mientras la pelicula que eliga el usuario no se encuentre dentro del listado de peliculas,
  // le vuelvo a pedir que ingrese otra, hasta que ingrese una disponible
  while (!PELICULAS.includes(pelicula)) {
    pelicula = prompt(
      "Esa pelicula no se encuentra en el listado, eliga otra: " + listaPelis
    );
  }
  return pelicula;
}

function informarPeliculasSeleccionadas(usuario) {
  var peliculas = usuario.peliculasDelUsuario().join(", ");
  var nombre = usuario.nombreDelUsuario();
  console.log(nombre + " eligio las siguientes peliculas: " + peliculas);
}

function main() {
  var nombre = preguntarNombre();
  var peliculasElegidas = [];
  var seguir = "s";
  while (seguir === "s") {
    peliculasElegidas.push(elegirPelicula());
    seguir = prompt("¿Quiere elegir otra pelicula? (s/n)");
  }
  const usuario = new Usuario(nombre, peliculasElegidas);
  informarPeliculasSeleccionadas(usuario);
}

main();

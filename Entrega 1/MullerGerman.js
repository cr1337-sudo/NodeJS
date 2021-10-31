
// Creacion de la clase Usuario
class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;

        // Durante la inicializacion puedo recibir un objeto o bien un array de objetos
        if (Array.isArray(libros)){
            this.libros = libros;
        }else{
            this.libros = Array(libros);
        };

        // Durante la inicializacion puedo recibir un objeto o bien un array de objetos
        if (Array.isArray(mascotas)){
            this.mascotas = mascotas;
        }else{
            this.mascotas = Array(mascotas);
        };
    };

    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    };

    addMascota(mascota){
        this.mascotas.push(mascota);
    };

    countMascotas(){
        return this.mascotas.length;
    };

    addBook(nombre, autor){
        this.libros.push({
            nombre: nombre,
            autor: autor
        });        
    };

    getBookNames(){
        let book_names = [];
        this.libros.forEach(function(element){
            book_names.push(element.nombre);
        });
        return book_names;
    };
}

// Prueba 1
console.log("----------------------------------- Test 1 -----------------------------------");
const german = new Usuario("German", "Luis", {nombre:"Ready Player One", autor:"Ernest Cline"},"perro");
console.log("El nombre completo es: " + german.getFullName());
german.addMascota("gato");
console.log("La cantidad total de mascotas es: " + german.countMascotas());
german.addBook("Fundacion","Isaac Asimov");
console.log(`Los libros registrados al usuario ${german.getFullName()} son: ` + german.getBookNames());

// Prueba 2
console.log("----------------------------------- Test 2 -----------------------------------");
const pepe = new Usuario("Pepe", "Gonzalez", [{nombre:"Ready Player Two", autor:"Ernest Cline"},{nombre:"Steve Jobs", autor:"Walter Isaacson"}],["pez","canario"]);
console.log("El nombre completo es: " + pepe.getFullName());
pepe.addMascota("gato");
console.log("La cantidad total de mascotas es: " + pepe.countMascotas());
pepe.addBook("Fundacion","Isaac Asimov");
console.log(`Los libros registrados al usuario ${pepe.getFullName()} son: ` + pepe.getBookNames());

// Definicion Completa del objeto german
console.log("----------------------------------- Objeto \"german\" -----------------------------------");
console.log(german);

// Definicion Completa del objeto pepe
console.log("----------------------------------- Objeto \"pepe\" -----------------------------------");
console.log(pepe);
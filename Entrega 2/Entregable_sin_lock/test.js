// ************************************************************************************************************************************** 
// ---------------------------------------------------------- Codigo de Prueba ----------------------------------------------------------
// ************************************************************************************************************************************** 

const Contenedor = require('./contenedor.js')

async function testCargarProductos(objContenedor){
    // En esta version los metodos de la clase Contenedor, no posee lock/mutex para acceder al archivo, por esta razon realizo una ejecucion serializada directamente en la funcion de prueba. Por esta razon los "await" se ejecutan uno tras otro y no puedo instanciar las tres promesas al mismo tiempo.
    try {
        let escuadra_id, calculadora_id, globo_id;

        escuadra_id = await objContenedor.save({
            title: 'Escuadra',
            price: 123.45,
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-512.png'
        });
        console.log(`ID Asignado al nuevo objeto Escuadra: ${escuadra_id}`);

        calculadora_id = await objContenedor.save({
            title: 'Calculadora',
            price: 234.56,
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png'
        });
        console.log(`ID Asignado al nuevo objeto Calculadora: ${calculadora_id}`);

        globo_id = await objContenedor.save({
            title: 'Globo Terraqueo',
            price: 345.67,
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-512.png'
        });
        console.log(`ID Asignado al nuevo objeto Globo: ${globo_id}`);

    } catch (error) {
        throw new Error("Se produjo un error al guardar los nuevos elementos!");
    }
}


const contenedor = new Contenedor('productos.txt');

// -------------------------------------------------------------------------------------------------------
// -------------------------------Para Probar, descomentar la accion a verificar -------------------------
// -------------------------------------------------------------------------------------------------------

// Test 1 - Carga 3 productos 
testCargarProductos(contenedor).then(()=>console.log("Fin!"));

// Test 2 - Obtiene el producto con ID=5 y lo muesta por consola
// contenedor.getById(5).then((obj)=>console.log(obj));

// Test 3 - Obtiene un Array con todos los objetos presentes en "productos.txt"
// contenedor.getAll().then((data)=>console.log(data));

// Test 4 - Elimina el objeto correspondiente al ID=4
// contenedor.deleteById(4);

// Test 5 - Elimina todos los registros
// contenedor.deleteAll();


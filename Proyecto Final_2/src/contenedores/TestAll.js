import TestContenedorMemoria from "./TestContenedorMemoria.js";
import TestContenedorArchivo from "./TestContenedorArchivo.js";
import TestContenedorMongoDb from "./TestContenedorMongoDb.js";
import TestContenedorFirebase from "./TestContenedorFirebase.js";

const testContenedorMemoria = new TestContenedorMemoria();
const testContenedorArchivo = new TestContenedorArchivo();
const testContenedorMongoDb = new TestContenedorMongoDb();
const testContenedorFirebase = new TestContenedorFirebase();

// testContenedorMemoria.run_test();
// testContenedorArchivo.run_test();
// testContenedorMongoDb.run_test();
testContenedorFirebase.run_test();


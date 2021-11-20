// Configuracion General del Motor MongoDB

// operation_mode = 0 ==> Almacenamiento en Memoria
// operation_mode = 1 ==> Almacenamiento en Archivo
// operation_mode = 2 ==> Almacenamiento en MongoDB
// operation_mode = 3 ==> Almacenamiento en Firebase

const operation_mode = 0

const db_file_path_productos =  './db_productos.txt';
const db_file_path_carritos =  './db_carritos.txt';

const mongo_server = {
    url: 'mongodb://localhost:27017'
}

// Insertar en el siguiente objeto la informacion de la cuenta de Firebase
const firebase_server = {  }


export { mongo_server, firebase_server , db_file_path_productos , db_file_path_carritos, operation_mode};
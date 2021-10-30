const express = require('express');
const { urlencoded } = require('express');

const ApiController = require('./api/api')
const WebServer = require('./webserver/webserver')
const DBProductos = require('./services/db_productos');
const DBCarritos = require('./services/db_carritos');

// Configuracion del Sistema
const config = {
    permisos: true,
    path_db_productos: "./services/dbproductos.txt",
    path_db_carritos: "./services/dbcarritos.txt",
}

// Inicializo Libreria Express
const app = express();
app.use(express.json());
app.use(urlencoded({extended: true}));

// Inicializo Libreria de Socket.IO
const { Server: HttpServer} = require('http');
const { Server: IOServer} = require('socket.io');

const httpserver = new HttpServer(app);
const io = new IOServer(httpserver);

// Inicializar Capa de servicio
const db_productos = new DBProductos(true,config);
const db_carritos = new DBCarritos(db_productos,config);

// Inicializar Capa de Controladores API
const api = new ApiController(app, db_productos, db_carritos, config);

// Inicializar Capa de Controladores Web
app.use(express.static(__dirname + '/webserver/public'));
app.use(express.static(__dirname + '/node_modules'));
const webserver = new WebServer(app, io);

// Inicializar el Server
const server = httpserver.listen(8080 || process.env.PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error)=>{
    console.log(error);
})
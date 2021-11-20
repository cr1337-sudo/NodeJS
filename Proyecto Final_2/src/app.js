import express from 'express';
import { urlencoded } from 'express'

import ApiController from './api/api.js'
import WebServer from './webserver/webserver.js'
import { getDaoProductos, getDaoCarritos } from './daos/index.js'

// Configuracion del Sistema
const config = {
    permisos: true,
}

// Inicializo Libreria Express
const app = express();
app.use(express.json());
app.use(urlencoded({extended: true}));

// Inicializo Libreria de Socket.IO
import { Server as HttpServer} from 'http';
import { Server as IOServer} from 'socket.io';

const httpserver = new HttpServer(app);
const io = new IOServer(httpserver);

// Inicializar Capa de servicio
const db_productos = getDaoProductos();
const db_carritos = getDaoCarritos();

// Inicializar Capa de Controladores API
const api = new ApiController(app, db_productos, db_carritos, config);

// Inicializar Capa de Controladores Web
app.use(express.static('./webserver/public'));
app.use(express.static('./node_modules'));
const webserver = new WebServer(app, io);

// Inicializar el Server
const server = httpserver.listen(8080 || process.env.PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error)=>{
    console.log(error);
})
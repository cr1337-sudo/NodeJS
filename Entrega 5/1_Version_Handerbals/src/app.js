const express = require('express');
const { urlencoded } = require('express');

const ApiController = require('./api/api')
const WebServer = require('./webserver/webserver')
const Store = require('./services/store.js');

const app = express();
app.use(express.json());
app.use(urlencoded({extended: true}));

// Inicializar Capa de servicio
const store = new Store();

// Inicializar Capa de Controladores API
const api = new ApiController(app, store);

// Inicializar Capa de Controladores Web
const webserver = new WebServer(app, store);

// Inicializar el Server
const server = app.listen(8080,()=>{
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error)=>{
    console.log(error);
})
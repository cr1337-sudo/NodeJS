const express = require('express');
const { urlencoded } = require('express');

const {routerProductos} = require('./routerProductos.js');

const app = express();
app.use(express.json());
app.use(urlencoded({extended: true}));

app.use('/',express.static('public'));
app.use('/api/productos',routerProductos);

const server = app.listen(8080,()=>{
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error)=>{
    console.log(error);
})
const axios = require('axios')
const handlebars = require('express-handlebars');
const MsgDB = require('../services/msgdb.js');

class WebServer{
    constructor(app, io){       

        // Configuracion del WebSocket
        io.on('connection', (socket)=>{
            console.log(`Cliente conectado: ${socket.id}`);

            // WebSocket de Productos
            axios.get('http://localhost:8080/api/productos')
            .then(res=>{
                const productos = res.data;
                socket.emit('productos', productos);
            })            
        
            socket.on('nuevo-producto', async (dato)=>{
                await axios.post('http://localhost:8080/api/productos', dato);
                let array_productos = await axios.get('http://localhost:8080/api/productos')
                io.sockets.emit("productos", array_productos.data);           
            })

            socket.on('update-producto', async (dato)=>{
                console.log(dato.id)
                await axios.put('http://localhost:8080/api/productos/',dato.id, dato);
                let array_productos = await axios.get('http://localhost:8080/api/productos')
                io.sockets.emit("productos", array_productos.data);           
            })

            socket.on('refresh-productos', async ()=>{
                let array_productos = await axios.get('http://localhost:8080/api/productos')
                io.sockets.emit("productos", array_productos.data);           
            })

        });
    }





}

module.exports = WebServer;
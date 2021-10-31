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
                await axios.put(`http://localhost:8080/api/productos/${dato.id}/`,dato);
                let array_productos = await axios.get('http://localhost:8080/api/productos')
                io.sockets.emit("productos", array_productos.data);           
            })

            socket.on('refresh-productos', async ()=>{
                let array_productos = await axios.get('http://localhost:8080/api/productos')
                io.sockets.emit("productos", array_productos.data);           
            })

            // WebSocket de Carritos
            axios.get('http://localhost:8080/api/carrito')
            .then(res=>{
                const carritos = res.data;
                socket.emit('carritos', carritos);
            })

            socket.on('refresh-carritos', async ()=>{
                let carritos = await axios.get('http://localhost:8080/api/carrito')
                io.sockets.emit("carritos", carritos.data);           
            })

        });
    }

}

module.exports = WebServer;
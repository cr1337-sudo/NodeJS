const axios = require('axios')
const handlebars = require('express-handlebars');
const MsgDB = require('../services/msgdb.js');

class WebServer{
    constructor(app, io){
        // Render de vistas
        app.engine("hbs",
            handlebars({
                extname: ".hbs",
                defaultLayout: "index.hbs",
                layoutsDir: __dirname + "/views/layouts",
                partialsDir: __dirname + "/views/partials"
            })
        );
        
        app.set('views', './webserver/views');
        app.set('view engine', 'hbs');

        app.get('/', (req,res)=>{
            res.render('formulario');
        });

        // Cargar Mensajes previos desde archivo
        this.msgdb = new MsgDB(__dirname + '/chat.txt',(mensajes)=>{
            io.sockets.emit('mensajes', mensajes);
        })

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
            
            // WebSocket de Chat
            if (this.msgdb.isStarted()){
                socket.emit('mensajes', this.msgdb.getAllMessages());
            }

            socket.on('new-message', async mensaje=>{
                mensaje.time = new Date().toLocaleString();
                this.msgdb.addMsg(mensaje);
                io.sockets.emit('mensajes', this.msgdb.getAllMessages());
            })

        });
    }





}

module.exports = WebServer;
const axios = require('axios')
const handlebars = require('express-handlebars');
const fs = require('fs')

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
        let mensajes = []


        try {
            const chat_file = fs.readFileSync("./webserver/chat.txt",'utf-8');
            mensajes = JSON.parse(chat_file);
        } catch (error) {
            console.log("No es posible abrir archivo de chat");
        }
 

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
            socket.emit('mensajes', mensajes);

            socket.on('new-message', async mensaje=>{
                mensaje.time = new Date().toLocaleString();
                mensajes.push(mensaje);
                await fs.promises.writeFile("./webserver/chat.txt",JSON.stringify(mensajes, null, 2))
                io.sockets.emit('mensajes', mensajes);
            })

        });
    }





}

module.exports = WebServer;
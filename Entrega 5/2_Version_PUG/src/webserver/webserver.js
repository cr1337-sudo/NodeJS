const axios = require('axios')

class WebServer{
    constructor(app, store){
        // Render de vistas
        app.set('views', './webserver/views');
        app.set('view engine', 'pug');

        app.get('/', (req,res)=>{
            res.render('formulario');
        });

        app.post('/productos',(req_http, res_http)=>{
            axios
            .post('http://localhost:8080/api/productos', req_http.body)
            .then(res => {
              res_http.redirect('/');
            })
            .catch(error => {
              console.error(error);
            })           
        });

        app.get('/productos', (req,res)=>{
            const productos = store.getAll();
            let listExists = false;
            if (productos.length>0){
                listExists=true;
            }
            res.render('productos', { productos, listExists});
        });
    }
}

module.exports = WebServer;
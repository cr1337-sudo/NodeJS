const productos = require('./router_productos.js')
const carritos = require('./router_carritos.js')

class API{
    constructor(app, db_productos, db_carritos, config){

        const routerProductos = productos.CreateRouter(db_productos,config);
        const routerCarrito = carritos.CreateRouter(db_carritos, db_productos,config);

        app.use('/api/productos',routerProductos);
        app.use('/api/carrito',routerCarrito);
    }
}

module.exports = API;
import { CreateRouter as CreateRouterProductos } from './router_productos.js'
import { CreateRouter as CreateRouterCarritos } from './router_carritos.js'

class API{
    constructor(app, db_productos, db_carritos, config){

        const routerProductos = CreateRouterProductos(db_productos,config);
        const routerCarrito = CreateRouterCarritos(db_carritos, db_productos,config);

        app.use('/api/productos',routerProductos);
        app.use('/api/carrito',routerCarrito);
    }
}

export default API;
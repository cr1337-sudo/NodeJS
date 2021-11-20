import ContenedorMongoDb from '../../contenedores/ContenedorMongoDb.js'
import {mongo_server} from '../../config/config.js'
import mongoose from '../../node_modules/mongoose/index.js'

const collection = 'carritos';

const scheme = mongoose.model(collection, { 
    nombre:     { type: String, required: true },
    descripcion:{ type: String, required: true },
    codigo:     { type: String, required: true, unique: true },
    precio:     { type: Number, required: true },
    stock:      { type: Number, required: true },
    foto:       { type: String, required: true },
    id:         { type: Number, required: true, unique: true},
    timestamp:  { type: Number}
});

class CarritosDaoMongoDb extends ContenedorMongoDb{
    constructor(){
        super(mongo_server, scheme);        
    }

    // Operaciones a nivel Carrito
    async getCarritosAll(){
        const data = await super.getAll();
        return data;
    };

    async getCarrito(id){
        const carrito = await super.get(id);
        if (carrito){
            return carrito;
        }else{
            return ({ error : 'carrito no encontrado' });
        }
    };

    async newCarrito(){
        const carrito = {}
        carrito.id = this.nextid;
        carrito.timestamp = Date.now();
        carrito.productos = [];
        const res = await super.insert(carrito);
        if (res){
            this.nextid = this.nextid + 1;
            return carrito;
        }else{
            return ({ error : 'carrito no agregado' });
        }
    }

    async removeCarrito(id){
        let res = await super.remove(id);
        if (res){
            return ({ ok : 'carrito eliminado' });
        }else{
            return ({ error : 'carrito no encontrado' });
        }
    };
    

    // Operaciones a nivel Productos (en Carritos)

    async insertProductoInCarrito(carrito_id, product){
        const carrito = await this.getCarrito(carrito_id);
        if (carrito){
            carrito.productos.push(product);
            await super.update(carrito_id, carrito);
            return carrito;
        }else{
            return ({ error : 'carrito no encontrado' });
        }

    }

    async getProductoInCarrito(carrito_id){
        const carrito = await this.getCarrito(carrito_id);
        if (carrito){
            return carrito.productos;
        }else{
            return ({ error : 'carrito no encontrado' });
        }
    }


    async deleteProductoInCarrito(carrito_id, product_id){
        const carrito = await this.getCarrito(carrito_id);
        if (carrito){
            const productos = carrito.productos;
            const new_productos = [];
            for (let p of productos){
                if (p.id != product_id){
                    new_productos.push(p)
                }
            }
            carrito.productos = [...new_productos];
            const res = await super.update(carrito_id,carrito);
            if (res){
                return true;
            }else{
                return ({ error : 'producto no encontrado' });
            }
        }else{
            return ({ error : 'carrito no encontrado' });
        }
    }

}

export default CarritosDaoMongoDb;
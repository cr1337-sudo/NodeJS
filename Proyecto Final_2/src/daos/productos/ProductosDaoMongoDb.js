import ContenedorMongoDb from '../../contenedores/ContenedorMongoDb.js'
import {mongo_server} from '../../config/config.js'
import mongoose from '../../node_modules/mongoose/index.js'

const collection = 'productos';

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

class ProductosDaoMongoDb extends ContenedorMongoDb{
    constructor(){
        super(mongo_server, scheme);        
    }

    isProducto(product){
        if ('nombre' in product && 
            'descripcion' in product &&
            'codigo' in product &&
            'foto' in product &&
            'precio' in product &&
            'stock' in product
            ){
            return true;
        }else{
            return false;
        }
    };

    async getAll(){
        const data = await super.getAll();
        return data
    };

    async get(id){
        let producto = await super.get(id);
        if (producto){
            return producto;
        }else{
            return ({ error : 'producto no encontrado' });
        }
    };

    async insert(product){
        if (this.isProducto(product)){
            let producto = await super.insert(product);
            return producto;
        }else{
            return ({ error : 'producto incorrecto' });
        }
    };


    async update(id, product){
        if (this.isProducto(product)){
            let producto = await super.update(id,product);
            return producto;
        }else{
            return ({ error : 'producto incorrecto' });
        }
    };

    async remove(id){
        let producto = await super.remove(id);
        if (producto){
            return ({ ok : 'producto eliminado' });
        }else{
            return ({ error : 'producto no encontrado' });
        }
    };

}

export default ProductosDaoMongoDb;
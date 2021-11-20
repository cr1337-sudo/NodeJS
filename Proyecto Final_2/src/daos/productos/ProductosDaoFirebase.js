import ContenedorFirebase from '../../contenedores/ContenedorFirebase.js'
import { firebase_server } from '../../config/config.js'

const collection = 'productos';

class ProductosDaoFirebase extends ContenedorFirebase{
    constructor(){
        super(firebase_server, collection);        
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
        return data;
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

export default ProductosDaoFirebase;
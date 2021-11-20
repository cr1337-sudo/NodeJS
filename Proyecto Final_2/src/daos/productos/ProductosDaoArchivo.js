import ContenedorArchivo from '../../contenedores/ContenedorArchivo.js'
import { db_file_path_productos } from '../../config/config.js'


class ProductosDaoArchivo extends ContenedorArchivo{
    constructor(){
        super(db_file_path_productos);        
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

export default ProductosDaoArchivo;

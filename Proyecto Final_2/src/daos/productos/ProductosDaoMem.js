import ContenedorMemoria from '../../contenedores/ContenedorMemoria.js'

class ProductosDaoMem extends ContenedorMemoria{
    constructor(){
        super();        
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

    getAll(){
        return super.getAll();
    };

    get(id){
        let producto = super.get(id);
        if (producto){
            return producto;
        }else{
            return ({ error : 'producto no encontrado' });
        }
    };

    insert(product){
        if (this.isProducto(product)){
            let producto = super.insert(product);
            return producto;
        }else{
            return ({ error : 'producto incorrecto' });
        }
    };

    update(id, product){
        if (this.isProducto(product)){
            let producto = super.update(id,product);
            return producto;
        }else{
            return ({ error : 'producto incorrecto' });
        }
    };

    remove(id){
        let producto = super.remove(id);
        if (producto){
            return ({ ok : 'producto eliminado' });
        }else{
            return ({ error : 'producto no encontrado' });
        }
    };

}

export default ProductosDaoMem;
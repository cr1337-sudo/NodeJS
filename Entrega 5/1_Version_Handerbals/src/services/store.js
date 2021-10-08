const ListaAnidada = require('./lista.js');

class Store{
    constructor(){
        this.database = new ListaAnidada();        
    }

    isProducto(product){
        if ('title' in product || 'price' in product || 'thumbnail' in product){
            return true;
        }else{
            return false;
        }
    };

    getAll(){
        return this.database.getArray();
    };

    get(id){
        let producto = this.database.getById(id);
        if (producto){
            return producto;
        }else{
            return ({ error : 'producto no encontrado' });
        }
    };

    insert(product){
        if (this.isProducto(product)){
            let producto = this.database.insertAtEnd(product);
            return producto;
        }else{
            return ({ error : 'producto incorrecto' });
        }
    };

    update(id, product){
        if (this.isProducto(product)){
            let producto = this.database.updateById(id,product);
            return producto;
        }else{
            return ({ error : 'producto incorrecto' });
        }
    };

    remove(id){
        let producto = this.database.removeById(id);
        if (producto){
            return ({ ok : 'producto eliminado' });
        }else{
            return ({ error : 'producto no encontrado' });
        }
    };
}

module.exports = Store;
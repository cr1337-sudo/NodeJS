const DB = require('./database');

class Store{
    constructor(config){
        this.database = new DB(config.server, config.table);        
    }

    isProducto(product){
        if ('title' in product || 'price' in product || 'thumbnail' in product){
            return true;
        }else{
            return false;
        }
    };

    async getAll(){
        const rows = await this.database.read('');
        const data = [];
        for (let row of rows){
            data.push({title: row.title, price:row.price, thumbnail: row.thumbnail});
        }
        return (data)
    };

    async get(id){
        let producto = await this.database.read({id});
        if (producto){
            return producto;
        }else{
            return ({ error : 'producto no encontrado' });
        }
    };

    async insert(product){
        if (this.isProducto(product)){
            let producto = await this.database.create(product);
            return producto;
        }else{
            return ({ error : 'producto incorrecto' });
        }
    };

    async update(id, product){
        if (this.isProducto(product)){
            let producto = await this.database.update(id,product);
            return producto;
        }else{
            return ({ error : 'producto incorrecto' });
        }
    };

    async remove(id){
        let producto = await this.database.delete(id);
        if (producto){
            return ({ ok : 'producto eliminado' });
        }else{
            return ({ error : 'producto no encontrado' });
        }
    };
}

module.exports = Store;
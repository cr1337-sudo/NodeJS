const ListaAnidada = require('./lista.js');
const fs = require('fs');

class DBProductos{
    constructor(inventario = false, config){
        this.database = new ListaAnidada();
        this.started = false;
        this.inventario = inventario;
        this.config = config;
        this.read_from_file();
    }

    async read_from_file(){
        if (this.inventario){
            fs.promises.readFile(this.config.path_db_productos, 'utf-8')
            .then((data)=>{
                const db = JSON.parse(data);
                db.map((product)=>{
                    this.database.insertRaw(product);
                })
                this.started = true;
            })
            .catch((e)=>{
                console.log(e);
            })
        }
    }

    async save_to_disk(){
        if (this.inventario){
            const db_vector = this.getAll();
            await fs.promises.writeFile(this.config.path_db_productos, JSON.stringify(db_vector, null, 2))
        }
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
            this.save_to_disk();
            return producto;
        }else{
            return ({ error : 'producto incorrecto' });
        }
    };

    load(product){
        this.database.insertAtEnd(product);
    }

    update(id, product){
        if (this.isProducto(product)){
            let producto = this.database.updateById(id,product);
            this.save_to_disk();
            return producto;
        }else{
            return ({ error : 'producto incorrecto' });
        }
    };

    remove(id){
        let producto = this.database.removeById(id);
        if (producto){
            return ({ ok : 'producto eliminado' });
            this.save_to_disk();
        }else{
            return ({ error : 'producto no encontrado' });
        }
    };
}

module.exports = DBProductos;
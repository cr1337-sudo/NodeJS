const ListaAnidada = require('./lista.js');
const DBProductos = require('./db_productos');
const fs = require('fs');


class DBCarritos{
    constructor(db_productos, config){
        this.database = new ListaAnidada();
        this.db_productos = db_productos;
        this.started = false;
        this.config = config;
        this.read_from_file();        
    }

    async read_from_file(){
        fs.promises.readFile(this.config.path_db_carritos,'utf-8')
        .then((data)=>{
            const db = JSON.parse(data);
            db.map((carrito)=>{
                const carrito_reg = new DBProductos();                
                carrito.productos.map((producto)=>{
                    carrito_reg.load(producto);
                })
                carrito_reg.id = carrito.id;
                carrito_reg.timestamp = carrito.timestamp;
                this.database.insertRaw(carrito_reg);
            })
            this.started = true;
        })
        .catch((e)=>{
            console.log(e);
        })
    }

    async save_to_disk(){
        const db_full = [];
        const db_carritos_vector = this.getAll();
        db_carritos_vector.map((carrito)=>{
            const registro = {
                id: carrito.id,
                timestamp: carrito.timestamp,
                productos: []
            }
            carrito.database.getArray().map((producto)=>{
                registro.productos.push(producto)
            })
            db_full.push(registro);
        })
        await fs.promises.writeFile(this.config.path_db_carritos,JSON.stringify(db_full, null, 2))
    }


    insert(){
        const database_productos = new DBProductos();
        const carrito = this.database.insertAtEnd(database_productos);
        this.save_to_disk();
        return (carrito)
    }

    remove(id){
        let carrito = this.database.removeById(id);
        if (carrito){
            this.save_to_disk();
            return ({ ok : 'carrito eliminado' });
        }else{
            return ({ error : 'carrito no encontrado' });
        }
    };

    getAll(){
        return this.database.getArray();
    };

    getFull(){
        const db_full = [];
        const db_carritos_vector = this.getAll();
        db_carritos_vector.map((carrito)=>{
            const registro = {
                id: carrito.id,
                timestamp: carrito.timestamp,
                productos: []
            }
            carrito.database.getArray().map((producto)=>{
                registro.productos.push(producto)
            })
            db_full.push(registro);
        })
        return db_full;
    }

    get(id){
        let carrito = this.database.getById(id);
        if (carrito){
            return carrito;
        }else{
            return ({ error : 'carrito no encontrado' });
        }
    };

    update(id, product_db){
        if (this.iscarrito(product)){
            let carrito = this.database.updateById(id,product_db);
            this.save_to_disk();
            return carrito;
        }else{
            return ({ error : 'carrito incorrecto' });
        }
    };

    getProducts(id){
        const db_productos_carrito = this.get(id);
        if ('error' in db_productos_carrito){
            return (db_productos_carrito);
        }else{
            console.log(db_productos_carrito);
            const productos = db_productos_carrito.getAll();
            return (productos);
        }
    }

    addProduct(carrito_id, product_id){
        const product = this.db_productos.get(product_id);
        const db_productos_carrito = this.get(carrito_id);
        if ('error' in product){
            return(product)
        }else if ('error' in db_productos_carrito){
            return(db_productos_carrito);
        }else{
            const carrito_product = db_productos_carrito.insert(product);
            this.save_to_disk();
            return ({id: carrito_product.id})
        }
    }

    loadProduct(carrito_id, product_id){
        const product = this.db_productos.get(product_id);
        const db_productos_carrito = this.get(carrito_id);
        const carrito_product = db_productos_carrito.insert(product);
    }

    deleteProduct(carrito_id, product_id){
        const db_productos_carrito = this.get(carrito_id);
        if ('error' in db_productos_carrito){
            return(db_productos_carrito);
        }else{
            this.save_to_disk();
            return (db_productos_carrito.remove(product_id))
        }
    }


}

module.exports = DBCarritos;
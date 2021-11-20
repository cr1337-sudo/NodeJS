import ContenedorArchivo from '../../contenedores/ContenedorArchivo.js'
import { db_file_path_carritos } from '../../config/config.js'


class CarritosDaoArchivo extends ContenedorArchivo{
    constructor(){
        super(db_file_path_carritos);
        this.nextid = 0;
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

export default CarritosDaoArchivo;

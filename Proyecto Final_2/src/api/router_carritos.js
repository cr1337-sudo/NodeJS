import express from 'express';
const { Router } = express;

function EnviarRespuesta(result,res){
    if ('error' in result){
        res.status(404).json(result);
    }else{
        res.json(result);
    }
}

function ValidateID(lista, res){
    lista.forEach(element => {
        if (isNaN(element)){
            res.status(404).json({error: 'id incorrecto'});
        }
    });
}


function CreateRouter(db_carritos, db_productos){
    const routerCarrito = Router();

    routerCarrito.get('/',async (req, res)=>{
        const carritos = await db_carritos.getCarritosAll();
        res.json(carritos);    
    });

    routerCarrito.post('/', async (req, res)=>{
        const carrito = await db_carritos.newCarrito()
        res.json(carrito.id);
    });

    routerCarrito.delete('/:id', async (req, res)=>{
        const carrito_id = parseInt(req.params.id);
        ValidateID([carrito_id],res);
        const result = await db_carritos.removeCarrito(carrito_id);
        EnviarRespuesta(result,res);        
    });

    routerCarrito.get('/:id/productos', async (req, res)=>{
        const carrito_id = parseInt(req.params.id);
        ValidateID([carrito_id],res);
        const products = await db_carritos.getProductoInCarrito(carrito_id)
        EnviarRespuesta (products,res);  
    });

    routerCarrito.post('/:id/productos', async (req, res)=>{
        const carrito_id = parseInt(req.params.id);
        const product_id = req.body.id;
        ValidateID([carrito_id,product_id],res);
        const product = db_productos.get(product_id);
        const carrito_product_id = await db_carritos.insertProductoInCarrito(carrito_id,product)
        EnviarRespuesta(carrito_product_id,res); 
    });


    routerCarrito.delete('/:id/productos/:id_prod', async (req, res)=>{
        const carrito_id = parseInt(req.params.id);
        const product_id = parseInt(req.params.id_prod);
        ValidateID([carrito_id,product_id],res);
        const result = await db_carritos.deleteProductoInCarrito(carrito_id, product_id)
        EnviarRespuesta(result,res);
    });


    return (routerCarrito);
}

export { CreateRouter }
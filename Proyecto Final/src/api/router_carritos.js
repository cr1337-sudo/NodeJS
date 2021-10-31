const express = require('express');
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

    routerCarrito.get('/',(req, res)=>{
        const carritos = db_carritos.getFull();
        res.json(carritos);    
    });

    routerCarrito.post('/', (req, res)=>{
        const carrito = db_carritos.insert(null)
        res.json(carrito.id);
    });

    routerCarrito.delete('/:id', (req, res)=>{
        const carrito_id = parseInt(req.params.id);
        ValidateID([carrito_id],res);
        const result = db_carritos.remove(carrito_id);
        EnviarRespuesta(result,res);        
    });

    routerCarrito.get('/:id/productos', (req, res)=>{
        const carrito_id = parseInt(req.params.id);
        ValidateID([carrito_id],res);
        const products = db_carritos.getProducts(carrito_id)
        EnviarRespuesta (products,res);  
    });

    routerCarrito.post('/:id/productos', (req, res)=>{
        const carrito_id = parseInt(req.params.id);
        const product_id = req.body.id;
        ValidateID([carrito_id,product_id],res);
        const carrito_product_id = db_carritos.addProduct(carrito_id,product_id)
        EnviarRespuesta(carrito_product_id,res); 
    });


    routerCarrito.delete('/:id/productos/:id_prod', (req, res)=>{
        const carrito_id = parseInt(req.params.id);
        const product_id = parseInt(req.params.id_prod);
        ValidateID([carrito_id,product_id],res);
        const result = db_carritos.deleteProduct(carrito_id, product_id)
        EnviarRespuesta(result,res);
    });


    return (routerCarrito);
}

module.exports = { CreateRouter }
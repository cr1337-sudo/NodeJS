const express = require('express');
const { Router } = express;


class API{
    constructor(app, store){
        const routerProductos = Router();

        routerProductos.get('/', (req, res)=>{
            const productos = store.getAll()
            res.json(productos);
        });
        
        
        routerProductos.get('/:id', (req, res)=>{
            const num = parseInt(req.params.id);
            if (isNaN(num)){
                res.status(404).json({error: 'id incorrecto'});
            }else{
                res.json(store.get(num));
            }
        });
        
        routerProductos.post('/', (req, res)=>{
            const producto = req.body;
            res.json(store.insert(producto));
            // store.insert(producto)
            // res.redirect('/productos');
        });
        
        routerProductos.put('/:id',(req, res)=>{
            const num = parseInt(req.params.id);
            const producto = req.body;
            if (isNaN(num)){
                res.status(404).json({error: 'id incorrecto'});
            }else{
                res.json(store.update(num, producto));
            }
        });
        
        routerProductos.delete('/:id', (req, res)=>{
            const num = parseInt(req.params.id);
            if (isNaN(num)){
                res.status(404).json({error: 'id incorrecto'});
            }else{
                res.json(store.remove(num));
            }
        });

        app.use('/api/productos',routerProductos);
    }
}

module.exports = API;
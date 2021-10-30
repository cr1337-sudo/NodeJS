const express = require('express');
const { Router } = express;

function CreateRouter(db_productos,config){
    const routerProductos = Router();

    routerProductos.get('/', (req, res)=>{
        const productos = db_productos.getAll()
        res.json(productos);
    });


    routerProductos.get('/:id', (req, res)=>{
        const num = parseInt(req.params.id);
        if (isNaN(num)){
            res.status(404).json({error: 'id incorrecto'});
        }else{
            res.json(db_productos.get(num));
        }
    });

    routerProductos.post('/', (req, res)=>{
        ValidarPermisos('/', 'post', config, res, ()=>{
            const producto = req.body;
            res.json(db_productos.insert(producto));
        });
    });

    routerProductos.put('/:id',(req, res)=>{
        const num = parseInt(req.params.id);
        ValidarPermisos('/' + String(num), 'put', config, res, ()=>{
            const producto = req.body;
            if (isNaN(num)){
                res.status(404).json({error: 'id incorrecto'});
            }else{
                res.json(db_productos.update(num, producto));
            }
        });
    });

    routerProductos.delete('/:id', (req, res)=>{
        const num = parseInt(req.params.id);
        ValidarPermisos('/' + String(num), 'delete', config, res,()=>{
            if (isNaN(num)){
                res.status(404).json({error: 'id incorrecto'});
            }else{
                res.json(db_productos.remove(num));
            }
        });
    });

    return routerProductos;
}

function ValidarPermisos(ruta, metodo, config, res, callback){
    if (config.permisos===false){
        res.json({ error:-1, descripcion: `ruta ${ruta} método ${metodo} no autorizada`})
    }else{
        callback();
    }
}

module.exports = { CreateRouter }
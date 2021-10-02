const express = require('express');
const API = require('./api.js');

const { Router } = express;
const routerProductos = Router();

const api = new API();


routerProductos.get('/', (req, res)=>{
    const productos = api.getAll()
    res.json(productos);
});


routerProductos.get('/:id', (req, res)=>{
    const num = parseInt(req.params.id);
    if (isNaN(num)){
        res.status(404).json({error: 'id incorrecto'});
    }else{
        res.json(api.get(num));
    }
});

routerProductos.post('/', (req, res)=>{
    const producto = req.body;
    res.json(api.insert(producto));
});

routerProductos.put('/:id',(req, res)=>{
    const num = parseInt(req.params.id);
    const producto = req.body;
    if (isNaN(num)){
        res.status(404).json({error: 'id incorrecto'});
    }else{
        res.json(api.update(num, producto));
    }
});

routerProductos.delete('/:id', (req, res)=>{
    const num = parseInt(req.params.id);
    if (isNaN(num)){
        res.status(404).json({error: 'id incorrecto'});
    }else{
        res.json(api.remove(num));
    }
});

exports.routerProductos = routerProductos;


import express from 'express';
const { Router } = express;

function CreateRouter(db_productos,config){
    const routerProductos = Router();

    routerProductos.get('/', async (req, res)=>{
        const productos = await db_productos.getAll()
        res.json(productos);
    });


    routerProductos.get('/:id', async (req, res)=>{
        const num = parseInt(req.params.id);
        if (isNaN(num)){
            res.status(404).json({error: 'id incorrecto'});
        }else{
            const data = await db_productos.get(num);
            res.json(data);
        }
    });

    routerProductos.post('/', async (req, res)=>{
        ValidarPermisos('/', 'post', config, res, async()=>{
            const producto = req.body;
            const data = await db_productos.insert(producto);
            res.json(data);
        });
    });

    routerProductos.put('/:id',async (req, res)=>{
        const num = parseInt(req.params.id);
        ValidarPermisos('/' + String(num), 'put', config, res, async()=>{
            const producto = req.body;
            if (isNaN(num)){
                res.status(404).json({error: 'id incorrecto'});
            }else{
                const data = await db_productos.update(num, producto);
                res.json(data);
            }
        });
    });

    routerProductos.delete('/:id', async (req, res)=>{
        const num = parseInt(req.params.id);
        ValidarPermisos('/' + String(num), 'delete', config, res,async()=>{
            if (isNaN(num)){
                res.status(404).json({error: 'id incorrecto'});
            }else{
                const data = await db_productos.remove(num);
                res.json(data);
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

export { CreateRouter };

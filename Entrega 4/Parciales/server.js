
const express = require('express');
const { urlencoded } = require('express');

class Api{
    constructor(){
        this.app = express();
        this.app.use(express.json());
        this.app.use(urlencoded({extended: true}));
        this.database = [];
        this.current_id = 1;
    }

    start(){
        this.app.get('/api/productos',(req, res)=>{
            res.json(this.database);
        });
        
        this.app.get('/api/productos/:id',(req, res)=>{
            const num = parseInt(req.params.id);
            if (isNaN(num)){
                res.status(404).json({error: 'id incorrecto'});
            }else{
                let product = null;
                this.database.map((element)=>{
                    if (element.id===num){
                        product = element;
                    }
                });
                if (!product){
                    res.status(404).json({error: 'producto no encontrado'});
                }else{
                    res.json(product);
                }                
            }
        });
        
        this.app.post('/api/productos',(req, res)=>{
            const data = req.body;
            console.log(data);
            if (!'title' in data || !'price' in data || !'thumbnail' in data){
                res.status(404).json({error: 'producto invalido'});
            }
            data.id = this.current_id;
            this.current_id++;
            this.database.push(data);
            res.json(data);
        });
        
        this.app.put('/api/productos/:id',(req, res)=>{
            const num = parseInt(req.params.id);
            const data = req.body;

            if (!'title' in data || !'price' in data || !'thumbnail' in data){
                res.status(404).json({error: 'producto invalido'});
            }else if(isNaN(num)){
                res.status(404).json({error: 'id incorrecto'});
            }else{
                let product = null;
                this.database.map((element)=>{
                    if (element.id===num){
                        product = element;
                    }
                });
                if (!product){
                    res.status(404).json({error: 'producto no encontrado'});
                }else{
                    let pos = this.database.indexOf(product);
                    data.id = num;
                    this.database[pos] = data;
                    res.json(data);
                }                
            }        
        });
        
        this.app.delete('/api/productos/:id',(req, res)=>{
            const num = parseInt(req.params.id);
            if (isNaN(num)){
                res.status(404).json({error: 'id incorrecto'});
            }else{
                let product = null;
                this.database.map((element)=>{
                    if (element.id===num){
                        product = element;
                    }
                });
                if (!product){
                    res.status(404).json({error: 'producto no encontrado'});
                }else{
                    const pos = this.database.indexOf(product);
                    this.database[pos]=undefined;
                    res.json(product);
                }                
            }        
        });
        
        this.server = this.app.listen(8080,()=>{
            console.log(`Servidor escuchando en el puerto ${this.server.address().port}`);
        });
        
        this.server.on("error", (error)=>{
            console.log(error);
        })

    }

    stop(){
        this.server.stop();
        console.log("Servidor Detenido!")
    }
}


const api = new Api();
api.start();

 

const fs = require('fs');
const { inherits } = require('util');

class Contenedor{

    constructor(filename){
        // Inicializo atributos
        this.filename = filename;
        this.semaphore = false;
    }

    // Private Semaphore
    private_check_semaphore(){
        return new Promise((resolve)=>{
            if (!this.semaphore){
                resolve();
            }
        })
    }

    // Save Object
    private_insert_new_object(data_string, objeto){
        return new Promise((resolve,reject)=>{
            let data_obj, ids, next_id;
            data_obj = JSON.parse(data_string);
            ids = data_obj.map((producto)=>producto.id);
            next_id = (Math.max(...ids) + 1);
            objeto.id = next_id;
            data_obj.push(objeto);
            resolve(data_obj);            
        })
    }

    async save(objeto){
        // Leo el archivo, y busco el ultimo ID
        let data_string, data_obj;
        try {
            await this.private_check_semaphore();
            this.semaphore=true;
            data_string = await fs.promises.readFile(this.filename, 'utf-8');
            data_obj = await this.private_insert_new_object(data_string, objeto);
            try {
                await fs.promises.writeFile(this.filename, JSON.stringify(data_obj,null,2));
            } catch (error) {
                console.log("Error de escritura", error);
            }               
        } catch (error) {
            console.log("No se encontraron registros previos!", error);
            objeto.id = 1;
            let data_obj=[objeto];
            try {
                await fs.promises.writeFile(this.filename, JSON.stringify(data_obj,null,2));
            } catch (error) {
                console.log("Error de escritura");
            }     
        }
        this.semaphore=false;
    }

    // Get Object
    private_get_object(data_string, id){
        return new Promise((resolve,reject)=>{
            let data_obj, ids, position;
            data_obj = JSON.parse(data_string);
            ids = data_obj.map((producto)=>producto.id);
            position = ids.indexOf(id);
            if (position>0){
                resolve(data_obj[position]);
            }else{
                reject(null);
            }      
        })
    }

    async getById(id){
        let data_string, objeto;
        try {
            await this.private_check_semaphore();
            this.semaphore=true;            
            data_string = await fs.promises.readFile(this.filename, 'utf-8');
            objeto = await this.private_get_object(data_string, id);
            return objeto;            
        } catch (error) {
            console.log("No se encuentra el registro", error);
            return null;
        }        
        this.semaphore=false;    
    }

    // Get All
    private_get_all(data_string){
        return new Promise((resolve,reject)=>{
            resolve(JSON.parse(data_string)) 
        })
    }

    async getAll(){
        let data_string, objeto;
        try {
            await this.private_check_semaphore();
            this.semaphore=true;                 
            data_string = await fs.promises.readFile(this.filename, 'utf-8');
            all_data = await this.private_get_all(data_string);
            return all_data;            
        } catch (error) {
            console.log("No se encuentran registros", error);
            return null;
        }        
        this.semaphore=false;
    }

    // Delete by ID
    private_delete_object(data_string, id){
        return new Promise((resolve,reject)=>{
            let data_obj, ids, position, new_data=[];
            data_obj = JSON.parse(data_string);
            ids = data_obj.map((producto)=>producto.id);
            position = ids.indexOf(id);
            if (position>0){
                for (let i=0; i<data_obj.length;i++){
                    if (i!==position) new_data.push(data_obj[i]);
                }
                resolve(new_data)
            }else{
                reject(null);
            }      
        })
    }

    async deleteById(id){
        let data_string, all_data;
        try {
            await this.private_check_semaphore();
            this.semaphore=true;   
            data_string = await fs.promises.readFile(this.filename, 'utf-8');
            all_data = await this.private_delete_object(data_string);
            await fs.promises.writeFile(this.filename, JSON.stringify(all_data,null,2));       
        } catch (error) {
            console.log("No se pudo borrar el registro", error);
            return null;
        }    
        this.semaphore=false;     
    }

    // Delete All
    async deleteAll(){
        try {
            await this.private_check_semaphore();
            this.semaphore=true;  
            await fs.promises.writeFile(this.filename, JSON.stringify([],null,2));       
        } catch (error) {
            console.log("Error al escribir el archivo", error);
            return null;
        }        
        this.semaphore=false;    
    }

}

contenedor = new Contenedor("./productos.txt");

contenedor.save(
    {
        title: "Escuadra",
        price: 123.45,
        thumbnail: "http://1.1.1.1"
    }
);

contenedor.save(
    {
        title: "Calculadora",
        price: 356.234,
        thumbnail: "http://1.1.1.2"
    }
);
contenedor.save(
    {
        title: "Regla",
        price: 15.5,
        thumbnail: "http://1.1.1.3"
    }
);
console.log("Inicio");
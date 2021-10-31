
const fs = require('fs');
const Lock = require('./lock.js')

class Contenedor{
    constructor(filename){
        this.filename = filename;
        this.lock = new Lock();
    }

    async save(objeto){
        // Espero a que se libere el lock, para evitar acceder al archivo en simultaneo.
        await this.lock.acquire();

        // Leo el archivo de la DB y conformo el proximo objeto a cargar.
        let full_data, next_id;
        try {
            let data_file,ids;
            data_file = await fs.promises.readFile(this.filename, 'utf-8');
            full_data = JSON.parse(data_file);

            // Verifico que no sea un archivo vacio
            if (!Array.isArray(full_data) || full_data.length==0){
                throw null;
            }

            ids = full_data.map((value)=>value.id);
            next_id = Math.max(...ids) + 1;
            objeto.id = next_id;
            full_data.push(objeto);

        } catch (error) {
            console.log("Primer Registro");
            next_id = 1
            objeto.id=next_id;
            full_data=[objeto];
        }

        // Guardo todo el contenido del archivo nuevamente, incluyendo el nuevo objeto.
        try {
            await fs.promises.writeFile(this.filename, JSON.stringify(full_data, null, 2));
            console.log("Objeto guardado correctamente!");
            return next_id;
        } catch (error) {
            throw new Error(`Se ha producido un error al escribir el archivo ${this.filename}`)
        } finally{
            this.lock.release();
        }
    }

    async getById(searchId){
        try {
            const file_data = await fs.promises.readFile(this.filename, 'utf-8');
            const data = JSON.parse(file_data);
            let returned_obj = null;
            data.map((obj)=>{
                if (obj.id==searchId){
                    returned_obj = obj;
                }
            })
            return returned_obj;
        } catch (error) {
            throw new Error(`Error al abrir el archivo de datos`);
        }
    }

    async getAll(){
        try {
            const file_data = await fs.promises.readFile(this.filename, 'utf-8');
            return JSON.parse(file_data);
        } catch (error) {
            throw new Error(`Error al abrir el archivo de datos`);
        }
    }

    async deleteById(search_id){
        // Espero a que se libere el lock, para evitar acceder al archivo en simultaneo.
        await this.lock.acquire();

        try {
            const file_data = await fs.promises.readFile(this.filename, 'utf-8');
            const data = JSON.parse(file_data);
            const new_data = data.filter((obj)=>{
                return obj.id!==search_id;
            });
            await fs.promises.writeFile(this.filename, JSON.stringify(new_data, null, 2));
            console.log("Archivo actualizado!");
        } catch (error) {
            throw new Error(`Se produjo un error al intentar eliminar el id: ${search_id}`);
        } finally {
            this.lock.release();
        }
    }

    async deleteAll(){
        // Espero a que se libere el lock, para evitar acceder al archivo en simultaneo.
        await this.lock.acquire();
        
        try {
            await fs.promises.writeFile(this.filename, JSON.stringify([],null,2));
            console.log("Todos los registros eliminados!")            
        } catch (error) {
            throw new Error("No es posible borrar los registros");
        } finally{
            this.lock.release();
        }
    }
}

module.exports = Contenedor


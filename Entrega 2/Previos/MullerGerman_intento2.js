const fs = require('fs');
const { inherits } = require('util');

class Contenedor{
    constructor(filename){
        // Inicializo atributos
        this.filename = filename;
    }
    

    async save(objeto){
        // Leo el archivo, y busco el ultimo ID
        let data_string, data_obj, ids, next_id;
        try {
            data_string = await fs.promises.readFile(this.filename, 'utf-8');
            data_obj = JSON.parse(data_string);
            ids = data_obj.map((producto)=>producto.id);
            next_id = (Math.max(...ids) + 1);            
        } catch (error) {
            console.log("No se encontraron registros previos!");
            data_obj = [];
            next_id = 1;
        }

        // Conformo el objeto
        objeto.id = next_id;
        data_obj.push(objeto);

        // Escribo el archivo de forma asincronica
        try {
            await fs.promises.writeFile(this.filename,JSON.stringify(data_obj,null,2))
        } catch (error) {
            console.log("Error al escribir el archivo!", error);
        }
    }


    async getById(id){
        let data_string, data_obj, ids, position;
        try {
            data_string = await fs.promises.readFile(this.filename, 'utf-8');

            data_obj = JSON.parse(data_string);
            ids = data_obj.map((producto)=>producto.id);
            position = ids.indexOf(id);
            if (position>0){
                return data_obj[position];
            }else{
                return null;
            }
            
        } catch (error) {
            console.log("Error al leer el archivo!", error);
            return null;
        }

    }


}

contenedor = new Contenedor("./test.txt");

contenedor.save(
    {
        title: "computadora",
        price: 1000,
        thumbnail: "blabla"
    }
);

console.log(contenedor.getById(2));


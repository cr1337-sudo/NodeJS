
const fs = require('fs');
const { inherits } = require('util');

class Contenedor{
    constructor(filename){
        // Inicializo atributos
        this.filename = filename;
        this.data = [];
        this.next_id = this.init();
    }

    async init(){
        // Obtengo del archivo el ultimo ID empleado
        try {
            const data_string = await fs.promises.readFile(this.filename, 'utf-8');
            const data_obj = JSON.parse(data_string);
            const ids = data_obj.map((producto)=>producto.id);
            this.data=data_obj;
            return (Math.max(...ids) + 1);            
        } catch (error) {
            console.log("Error al leer el archivo");
            console.log(error);
            return 1;
        }
    }

    async save(objeto){
        objeto.id = this.next_id;
        this.data.push(objeto);

        try {
            await fs.promises.writeFile(this.filename,JSON.stringify(this.data,null,2))
            this.next_id++;
        } catch (error) {
            console.log("Error al escribir el archivo");
            console.log(error);
            return error;
        }
    }

    async leerObjeto(){

    }
}

contenedor = new Contenedor("./test.txt");
console.log("Hola!");
contenedor.save(
    {
        title: "computadora",
        price: 1000,
        thumbnail: "blabla"
    }
);


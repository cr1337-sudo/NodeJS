import { promises as fs} from 'fs'

class ContenedorArchivo{

    constructor(path){
        this.path = path;
        this.nextid = 0;
        this.started = false;
    }


    LoadVector(data){
        const vector = [];
        const data_vector = data.split('\n');
        for (let entry of data_vector){
            if (entry.length>1){
                vector.push(JSON.parse(entry))
            }
        }
        return(vector);
    }

    async init(){
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            const data_vector = this.LoadVector(data);
            let last_id = 0;
            for (let entry of data_vector){
                if (entry.id > last_id){
                    last_id = entry.id;
                }                
            }
            this.started = true;
            this.nextid = last_id + 1;
        } catch (error) {
            this.started = true;
            this.nextid = 0;
        }

    }

    async erase_all(){
        try {
            await fs.unlink(this.path);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async insert(data){
        data.id = this.nextid;
        data.timestamp = Date.now();
        await fs.appendFile(this.path, JSON.stringify(data) + '\n')
        this.nextid = this.nextid + 1;
        return(data);
    }

    async getAll(){
        const data = await fs.readFile(this.path, 'utf-8');
        const data_vector = this.LoadVector(data);
        return data_vector;
    }

    async get(id){
        const db = await this.getAll();
        for (let contenido of db){
            if (contenido.id == id){
                return contenido
            }
        }
        return null;
    }

    async update(id, data){
        const db = await this.getAll();
        await fs.writeFile(this.path, '');
        let retorno = null;
        for (let contenido of db){
            if (contenido.id == id){    
                data.id = contenido.id;
                data.timestamp = contenido.timestamp;
                await fs.appendFile(this.path, JSON.stringify(data) + '\n');
                retorno = data;
            }else{
                await fs.appendFile(this.path, JSON.stringify(contenido) + '\n');
            }
        }
        return retorno;
    }

    async remove(id){
        const db = await this.getAll();
        let removed = false;
        await fs.writeFile(this.path, '');
        for (let contenido of db){
            if (contenido.id != id){
                await fs.appendFile(this.path, JSON.stringify(contenido) + '\n');
            }else{
                removed = true;
            }
        }
        return removed;        
    }

}

export default ContenedorArchivo;
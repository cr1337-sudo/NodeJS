import mongoose from '../node_modules/mongoose/index.js'

class ContenedorMongoDb{
    constructor(config, scheme){
        this.config = config;
        this.scheme = scheme;
        this.nextid = 0;
    }

    async init(collection){
        const url = this.config + "/" + collection;
        mongoose.connect(url);
    }

    async erase_all(){
        try {
            await this.scheme.collection.drop();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async insert(data){
        try {
            data.id = this.nextid;
            data.timestamp = Date.now();
            await this.scheme.create(data)
            this.nextid = this.nextid + 1;
            return(data);
        } catch (error) {
            console.log(error)
            return null;
        }

    }

    async getAll(){
        try {
            const data = await this.scheme.find({},{_id:0, __v:0});
            return data;  
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async get(id){
        try {
            const data = await this.scheme.find({id},{_id:0, __v:0});
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async update(id, new_data){
        try {
            await this.scheme.updateOne({id}, new_data);
            return new_data;
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    async remove(id){
        try {
            await this.scheme.deleteOne({id});
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default ContenedorMongoDb;
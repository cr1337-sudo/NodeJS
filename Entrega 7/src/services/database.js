const createKnex = require('knex');

class DB{
    constructor(options, table){
        this.options = options;
        this.table = table;
        
        try {
            this.knex = createKnex(this.options);
        } catch (error) {
            console.log("Error para conectarse a la DB");
            console.log(error);
            return null;
        }
    }

    async create(data){
        try {
            await this.knex(this.table).insert(data);
        } catch (error) {
            console.log("Error para insertar dato a la DB");
            console.log(error);
            return null;
        }
    }

    async read(query){
        try {
            const data = await this.knex(this.table).select(query);
            return data;
        } catch (error) {
            console.log("Error en Select a la DB");
            console.log(error);
            return null;
        }
    }

    async update(condition, value){
        try {
            await this.knex(this.table).where(condition).update(value);
        } catch (error) {
            console.log("Error en Update a la DB");
            console.log(error);
            return null;
        }
    }

    async delete(condition){
        try {
            await this.knex(this.table).where(condition).del();
        } catch (error) {
            console.log("Error en Delete a la DB");
            console.log(error);
            return null;
        }
    }
}

module.exports = DB;
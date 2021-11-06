const DB = require('./database');

class MsgDB{
    constructor(config, init_chat){
        this.database = new DB(config.server, config.table);   
        this.started = false;

        //Simulo que el sistema tarda al comienzo 15 seg en obtener la informacion previa de mensajes.
        setTimeout(async()=>{
            const rows = await this.database.read('')
            const data = [];
            for (let row of rows){
                data.push({user: row.user, msg:row.msg, time: row.time});
            }
            init_chat(data);
            this.started = true;
        },10000);

    }

    async addMsg(mensaje){
        await this.database.create(mensaje)
    }

    async getAllMessages(){
        const rows = await this.database.read('')
        const data = [];
        for (let row of rows){
            data.push({user: row.user, msg:row.msg, time: row.time});
        }
        return(data);
    }

    isStarted(){
        return (this.started);
    }
}

module.exports = MsgDB;
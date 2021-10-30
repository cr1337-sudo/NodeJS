const fs = require('fs');

class MsgDB{
    constructor(filename, init_chat){
        this.db = [];
        this.started = false;

        //Simulo que el sistema tarda al comienzo 15 seg en obtener la informacion previa de mensajes.
        setTimeout(()=>{
            fs.promises.readFile(filename,'utf-8')
            .then((data)=>{
                this.db = JSON.parse(data);
                init_chat(this.db);
                this.started = true;
            })
            .catch((e)=>{
                console.log(e);
            })
        },10000);

    }

    async addMsg(mensaje){
        this.db.push(mensaje);
        await fs.promises.writeFile("./webserver/chat.txt",JSON.stringify(this.db, null, 2))
    }

    getAllMessages(){
        return this.db;
    }

    isStarted(){
        return (this.started);
    }
}

module.exports = MsgDB;
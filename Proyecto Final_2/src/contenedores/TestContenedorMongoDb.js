import ContenedorMongoDb from './ContenedorMongoDb.js'
import TestContenedor from './TestContenedor.js';

import mongoose from '../node_modules/mongoose/index.js'
import {mongo_server} from '../config/config.js'

const scheme = mongoose.model('TestContenedorMongoDb', { 
    nombre:     { type: String, required: true },
    descripcion:{ type: String, required: true },
    codigo:     { type: String, required: true, unique: true },
    precio:     { type: Number, required: true },
    stock:      { type: Number, required: true },
    foto:       { type: String, required: true },
    id:         { type: Number, required: true, unique: true},
    timestamp:  { type: Number}
});


class TestContenedorMongoDb extends TestContenedor{
    constructor(){
        const contenedorMongoDb = new ContenedorMongoDb(mongo_server.url, scheme);
        super(contenedorMongoDb);
    }

    async run_test(){
        await super.init('TestContenedorMongoDb');
        await super.test();
    }
}

export default TestContenedorMongoDb;


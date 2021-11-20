import ContenedorFirebase from './ContenedorFirebase.js'
import TestContenedor from './TestContenedor.js';
import { firebase_server } from '../config/config.js'

class TestContenedorFirebase extends TestContenedor{
    constructor(){
        const contenedorFirebase = new ContenedorFirebase(firebase_server,'TestContenedorFirebase');
        super(contenedorFirebase);
    }

    async run_test(){
        await super.init();
        await super.test();
    }
}

export default TestContenedorFirebase;
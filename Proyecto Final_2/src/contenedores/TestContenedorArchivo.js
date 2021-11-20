import ContenedorArchivo from './ContenedorArchivo.js'
import TestContenedor from './TestContenedor.js';

class TestContenedorArchivo extends TestContenedor{
    constructor(){
        const contenedorArchivo = new ContenedorArchivo('./db.txt');
        super(contenedorArchivo);
    }

    async run_test(){
        await super.init();
        await super.test();
    }
}

export default TestContenedorArchivo;
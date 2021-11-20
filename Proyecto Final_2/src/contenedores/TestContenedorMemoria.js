import ContenedorMemoria from './ContenedorMemoria.js'
import TestContenedor from './TestContenedor.js';

class TestContenedorMemoria extends TestContenedor{
    constructor(){
        const contenedorMemoria = new ContenedorMemoria();
        super(contenedorMemoria);
    }

    async run_test(){
        await super.init();
        await super.test();
    }
}

export default TestContenedorMemoria;
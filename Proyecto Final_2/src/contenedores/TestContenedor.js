class TestContenedor{

    constructor(contenedor){
        this.contenedor = contenedor;
    }

    async init(){
        this.contenedor.init();
    }

    async test(){
        await this.erase_all();
        await this.insert();
        await this.getAll();
        await this.get();
        await this.remove();
        await this.update();
    }

    async erase_all(){
        await this.contenedor.erase_all();
    }

    async insert(){
        this.banner_ejecucion("Insertar 6 registros");

        await this.contenedor.insert(
        {
            "nombre": "Escuadra",
            "descripcion": "Elemento de dibujo",
            "codigo": "1234",
            "precio": "45.34",
            "stock": "100",
            "foto": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-512.png"
        })

        await this.contenedor.insert(
        {
            "nombre": "Calculadora",
            "descripcion": "Calculadora Cientifica para Estudiantes de Ingenieria",
            "codigo": "2345",
            "precio": "1500",
            "stock": "20",
            "foto": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png"
        })

        await this.contenedor.insert(
        {
            "nombre": "Globo Terreaqueo",
            "descripcion": "Globo Terraqueo para estudio de geografia en nivel escolar",
            "codigo": "64345",
            "precio": "800",
            "stock": "40",
            "foto": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-512.png"
        })

        await this.contenedor.insert(
        {
            "nombre": "Lapiz",
            "descripcion": "Lapiz de madera HB",
            "codigo": "1235",
            "precio": "1.25",
            "stock": "200",
            "foto": "https://cdn1.iconfinder.com/data/icons/drawing-tools-5/512/pencil-256.png"
        })

        await this.contenedor.insert(
        {
            "nombre": "Boligrafo",
            "descripcion": "Boligrafo tinta azul",
            "codigo": "2346",
            "precio": "2.00",
            "stock": "250",
            "foto": "https://cdn2.iconfinder.com/data/icons/scrap/Pen%203.png"
        })
    
        await this.contenedor.insert(
        {
            "nombre": "Cuaderno",
            "descripcion": "Cuaderno cuadriculado tapa dura",
            "codigo": "643",
            "precio": "800",
            "stock": "40",
            "foto": "https://cdn2.iconfinder.com/data/icons/Office_supplies/128/moleskine_notebook.png"
        })


        this.banner_resultado("Insertar 6 registros")
        const data = await this.contenedor.getAll();
        console.log(data);
    };

    async getAll(){
        this.banner_ejecucion("Listar todos los registros");
        const data = await this.contenedor.getAll();

        this.banner_resultado("Listar todos los registros")
        console.log(data)
    }

    async get(){
        this.banner_ejecucion("Listar el registro con ID = 2");
        const data = await this.contenedor.get(2);

        this.banner_resultado("Listar el registro con ID = 2");
        console.log(data)
    }

    async remove(){
        this.banner_ejecucion("Remover el registro con ID = 2");
        await this.contenedor.remove(2);

        this.banner_resultado("Remover el registro con ID = 2");
        const data = await this.contenedor.getAll();
        console.log(data);
    }

    async update(){
        this.banner_ejecucion("Modificar el Stock del registro con ID 3");
        await this.contenedor.update(3,
            {
                "nombre": "Globo Terreaqueo",
                "descripcion": "Globo Terraqueo para estudio de geografia en nivel escolar",
                "codigo": "644",
                "precio": "800",
                "stock": "400",
                "foto": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-512.png"
            }
        )

        this.banner_resultado("Modificar el Stock del registro con ID 3");
        const data = await this.contenedor.getAll();
        console.log(data);
    }

    banner_ejecucion(title){
        console.log(`\n`);
        console.log(`=====================================================================`);
        console.log(`Test ${title} - Ejecucion`);
        console.log(`=====================================================================`);
    }

    banner_resultado(title){
        console.log(`\n`);
        console.log(`Test ${title} - Resultado`);
    }

}

export default TestContenedor;
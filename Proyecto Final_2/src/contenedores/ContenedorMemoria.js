class Nodo{
    constructor(contenido){
        this.contenido = contenido;
        this.next = null;
        this.prev = null;
    }

    setNext(next_node){
        this.next = next_node;
    }

    setPrev(prev_node){
        this.prev = prev_node;
    }

    getNext(){
        return(this.next);
    }

    getPrev(){
        return(this.prev);
    }

}

class ContenedorMemoria{
    constructor(){
        this.cantidad = 0;
        this.nextid = 0;
        this.init_node = new Nodo(null);
        this.end_node = new Nodo(null);;
    }


    init(){
        return true;
    }

    erase_all(){
        return true;
    }

    insert(contenido){
        contenido.id = this.nextid;
        contenido.timestamp = Date.now();
        const node = new Nodo(contenido);
        if (this.cantidad===0){
            node.setNext(this.end_node);
            this.init_node.setNext(node);
            this.end_node.setPrev(node);
        }else{
            const last_node = this.end_node.getPrev();
            node.setNext(this.end_node);
            node.setPrev(last_node);
            last_node.setNext(node);
            this.end_node.setPrev(node);
        }
        this.cantidad++;
        this.nextid++;
        return(contenido);
    }

    remove(id){
        if (this.cantidad===0) return false;

        let i = this.init_node.getNext();
        while(i.getNext()){
            if(i.contenido.id===id){
                let previo = i.getPrev();
                let siguiente = i.getNext();
                

                // Si se elimina el primer elemento
                if(!previo){
                    siguiente.setPrev(this.end_node);
                    this.init_node.setNext(siguiente);
                }else{
                    previo.setNext(siguiente);
                }            


                // Si se elimina el ultimo elemento
                if (!siguiente){
                    previo.setNext(this.end_node);
                    this.end_node.setPrev(previo);
                }else{
                    siguiente.setPrev(previo);
                }

                // Actualizar cantidad
                this.cantidad--;
                return true;
            }
            i = i.getNext();
        }
        return false;
    }

    get(id){
        if (this.cantidad===0) return null;
        let i = this.init_node.getNext();
        while(i.getNext()){
            if(i.contenido.id==id){
                return(i.contenido)
            }
            i = i.getNext();
        }
        return(null);
    }

    getAll(){
        const array = [];
        if(this.cantidad>0){
            let i = this.init_node.getNext();
            while(i.getNext()){
                array.push(i.contenido);
                i = i.getNext();
            }
        }
        return(array);
    }

    update(id, new_data){
        let i = this.init_node.getNext();
        while(i.getNext()){
            if(i.contenido.id===id){
                new_data.id = id;
                i.contenido = new_data;
                return(i.contenido)
            }
            i = i.getNext();
        }
        return(null);

    }
}

export default ContenedorMemoria;

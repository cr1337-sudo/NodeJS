class Nodo{
    constructor(valor){
        this.valor = valor;
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

class Lista{
    constructor(){
        this.cantidad = 0;
        this.init_node = new Nodo(null);
        this.end_node = new Nodo(null);;
    }

    insertAtEnd(value){
        const node = new Nodo(value);
        if (this.cantidad===0){
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
    }

    removeByValue(dato){
        let i = this.init_node.getNext();
        while(i.getNext()){
            if(i.valor===dato){
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
            }
            i = i.getNext();
        }
    }

    getArray(){
        const array = [];
        let i = this.init_node.getNext();
        while(i.getNext()){
            array.push(i.valor);
            i = i.getNext();
        }
        return(array);
    }
}

const lista = new Lista();
lista.insertAtEnd(1);

lista.insertAtEnd(2);
lista.insertAtEnd(3);
lista.insertAtEnd(4);
lista.insertAtEnd(5);


console.log(lista.getArray());

lista.removeByValue(3);

console.log(lista.getArray());

lista.removeByValue(1);

console.log(lista.getArray());
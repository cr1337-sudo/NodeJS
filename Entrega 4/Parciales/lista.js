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
        this.init_node = new;
        this.end_node = null;
    }

    insertAtEnd(value){
        const node = new Nodo(value);
        if (this.cantidad===0){
            this.init_node = node;
            this.end_node = node;
        }else{
            this.end_node.setNext(node);
            node.setPrev = this.end_node;
            this.end_node = node;
        }
        this.cantidad++;
    }

    removeByValue(dato){
        let i = this.init_node;
        while(i){
            if(i.valor===dato){
                let previo = i.getPrev();
                let siguiente = i.getNext();
                

                // Si se elimina el primer elemento
                if(!previo){
                    this.init_node=siguiente;
                }else{
                    previo.setNext(siguiente);
                }            


                // Si se elimina el ultimo elemento
                if (!siguiente){
                    this.end_node = previo;
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
        let i = this.init_node;
        while(i){
            array.push(i.valor);
            i = i.getNext();
        }
        return(array);
    }
}

/*
const nodo1 = new Nodo("1");
const nodo2 = new Nodo("2");
const nodo3 = new Nodo("3");

nodo1.setNext(nodo2);
nodo2.setNext(nodo3);
nodo3.setPrev(nodo2);
nodo2.setPrev(nodo1);

console.log(nodo1.valor);
console.log(nodo1.getNext().valor);
console.log(nodo1.getNext().getNext().valor);
*/

const lista = new Lista();
lista.insertAtEnd(1);

lista.insertAtEnd(2);
lista.insertAtEnd(3);
lista.insertAtEnd(4);
lista.insertAtEnd(5);


console.log(lista.getArray());

lista.removeByValue(3);

console.log(lista.getArray());
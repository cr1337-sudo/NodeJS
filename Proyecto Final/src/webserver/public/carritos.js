const socket = io();

let operacion = {
    carrito_id: null,
    product_id: null
}

window.onload =  function InicializarVistas(){
     LoadSection('./carritos.hbs',null,'full-body', ()=>{
        const vista_formulario = document.getElementById('vista-formulario');
        vista_formulario.style.display = 'none';
    });
}

 function LoadSection(plantilla, params ,position, callback_hide){
    fetch(plantilla)
    .then((data)=>{
        return data.text();
    })
    .then(plantilla =>{
        const render = Handlebars.compile(plantilla);
        document.getElementById(position).innerHTML = render(params);
        callback_hide();
    })
    .catch(e=>{
        console.log(e);
    })
}

function HideVista(posicion){
    const vista = document.getElementById(posicion);
    vista.style.display = 'none';
    const nav = document.querySelector('.navbar');
    nav.scrollIntoView();
}

socket.on('carritos', carritos=>{
    fetch('./carritos-cards.hbs')
    .then((data)=>{
        return data.text();
    })
    .then(plantilla =>{
        const render = Handlebars.compile(plantilla);
        let listExists = false;
        if (carritos.length>0){
            listExists=true;
        }
        console.log(carritos)
        document.getElementById("vista-carritos").innerHTML = render({carritos,listExists});
    })
    .catch(e=>{
        console.log(e);
    })
})


function newCarrito(){
    fetch(`http://localhost:8080/api/carrito/`, {
        method: 'POST',
    })
    .then(alert("Nuevo Carrito Creado!"))
    .then(socket.emit("refresh-carritos"))
}

function DeleteCarrito(id){
    fetch(`http://localhost:8080/api/carrito/${id}`, {
        method: 'DELETE',
    })
    .then(alert("Carrito Eliminado!"))
    .then(socket.emit("refresh-carritos"))
}

function RemoverProducto(btn,carrito_id){
    producto_id = btn.id;
    fetch(`http://localhost:8080/api/carrito/${carrito_id}/productos/${producto_id}`, {
        method: 'DELETE',
    })
    .then(alert("Producto removido del Carrito!"))
    .then(socket.emit("refresh-carritos"))
}


function AddProduct(btn){
    operacion.carrito_id = btn.id;
    fetch(`http://localhost:8080/api/productos/`, {
        method: 'GET',
    })
    .then((data)=>{
        return data.json();
    })
    .then((productos)=>{
        let listExists = false;
        if (productos.length>0){    
            listExists=true;
        }
        const params = {listExists, productos};
        LoadSection('./agregar-productos-cards.hbs', params,'vista-agregar-productos', ()=>{
            const vista_formulario = document.getElementById("vista-formulario");
            vista_formulario.style.display = 'inherit';
            vista_formulario.scrollIntoView();
        });
    })
}

function AgregarProductoBtn(btn){
    operacion.product_id = btn.id;
    const producto = {
        id: operacion.product_id
    }

    fetch(`http://localhost:8080/api/carrito/${operacion.carrito_id}/productos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    })
    .then((data)=>{
        return data.json();
    })
    .then((data)=>{
        alert("Producto Agregado al Carrito!");
        HideVista('vista-formulario');  
    })
    .then(()=>{
        setTimeout(()=>{
            socket.emit("refresh-carritos")
        },500)
    })
}

function cancelBtn(btn){
    const vista_formulario = document.getElementById("vista-formulario");
    vista_formulario.style.display = 'none';
    const nav = document.querySelector('.navbar');
    nav.scrollIntoView();
}


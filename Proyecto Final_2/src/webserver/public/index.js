const socket = io();

let operacion = {
    mode_new: true,
    id: null,
    timestamp: null
}

window.onload = LoadSection('./inventario.hbs');

function LoadSection(plantilla){
    fetch(plantilla)
    .then((data)=>{
        return data.text();
    })
    .then(plantilla =>{
        const render = Handlebars.compile(plantilla);
        document.getElementById("full-body").innerHTML = render();
        const vista_formulario = document.getElementById("vista-formulario");
        vista_formulario.style.display = 'none';
    })
    .catch(e=>{
        console.log(e);
    })
}


socket.on('productos', productos=>{
    fetch('./productos-cards.hbs')
    .then((data)=>{
        return data.text();
    })
    .then(plantilla =>{
        const render = Handlebars.compile(plantilla);
        let listExists = false;
        if (productos.length>0){
            listExists=true;
        }
        document.getElementById("vista-productos").innerHTML = render({productos,listExists});
    })
    .catch(e=>{
        console.log(e);
    })
})

function newProduct(formulario){
    operacion.mode_new = true;
    operacion.id = null;
    operacion.timestamp = null;
    document.getElementById("nombre").value = ""
    document.getElementById("descripcion").value = ""
    document.getElementById("codigo").value = ""
    document.getElementById("precio").value = ""
    document.getElementById("stock").value = ""
    document.getElementById("foto").value = ""
    const vista_formulario = document.getElementById("vista-formulario");
    vista_formulario.style.display = 'inherit';
    vista_formulario.scrollIntoView();
}

function cancelBtn(btn){
    const vista_formulario = document.getElementById("vista-formulario");
    vista_formulario.style.display = 'none';
    const nav = document.querySelector('.navbar');
    nav.scrollIntoView();
}


function addProduct(formulario){
    const mensaje = {
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        codigo: document.getElementById("codigo").value,
        precio: document.getElementById("precio").value,
        stock: document.getElementById("stock").value,
        foto: document.getElementById("foto").value
    }
    document.getElementById("nombre").value = ""
    document.getElementById("descripcion").value = ""
    document.getElementById("codigo").value = ""
    document.getElementById("precio").value = ""
    document.getElementById("stock").value = ""
    document.getElementById("foto").value = ""

    if (operacion.mode_new){
        socket.emit("nuevo-producto", mensaje); 
    }else{
        mensaje.id = operacion.id;
        mensaje.timestamp = operacion.timestamp;
        socket.emit("update-producto", mensaje);
    }
    const vista_formulario = document.getElementById("vista-formulario");
    vista_formulario.style.display = 'none';
    return false;
}

function deleteProducto(btn){
    const product_id = btn.id;
    fetch(`http://localhost:8080/api/productos/${product_id}`, {
        method: 'DELETE',
    })
    .then(alert("Producto Eliminado!"))
    .then(socket.emit("refresh-productos"))
}

function editProducto(btn){
    const product_id = btn.id;
    fetch(`http://localhost:8080/api/productos/${product_id}`, {
        method: 'GET',
    })
    .then((data)=>{
        return data.json();
    })
    .then((product)=>{
        console.log(product);
        document.getElementById("nombre").value = product.nombre;
        document.getElementById("descripcion").value = product.descripcion;
        document.getElementById("codigo").value = product.codigo;
        document.getElementById("precio").value = product.precio;
        document.getElementById("stock").value = product.stock;
        document.getElementById("foto").value = product.foto;

        const vista_formulario = document.getElementById("vista-formulario");
        vista_formulario.style.display = 'inherit';

        const btn_formulario = document.getElementById("btn-formulario");
        btn_formulario.textContent = "Editar";
        operacion.mode_new = false;
        operacion.id = product_id;
        operacion.timestamp = product.timestamp;
        vista_formulario.scrollIntoView();

    })
}


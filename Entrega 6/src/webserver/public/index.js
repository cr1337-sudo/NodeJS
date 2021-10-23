const socket = io();

function addProduct(formulario){
    const mensaje = {
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value
    }
    socket.emit("nuevo-producto", mensaje);
    document.getElementById("title").value = ""
    document.getElementById("price").value = ""
    document.getElementById("thumbnail").value = ""
    return false;
}

socket.on('productos', productos=>{
    fetch('./productos.hbs')
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

function renderMessages(mensajes){
    let html = "<div><ul>"
    mensajes.map((element, index)=>{
        html = html + `<li><strong>${element.user}</strong><span style="color:red">[${element.time}]:</span>${element.msg}</li>`
    })
    html = html + "</ul></div>"
    document.getElementById("chat").innerHTML = html;
}

function sendMessage(formulario){
    const mensaje = {
        user: document.getElementById("user").value,
        msg: document.getElementById("msg").value
    }
    socket.emit("new-message", mensaje);
    document.getElementById("msg").value = "";
    return false;
}

socket.on('mensajes', mensajes=>{
    const spinner = document.getElementById("spinner");
    spinner.style.display = 'none';
    document.getElementById("chat-btn").disabled = false;
    renderMessages(mensajes);
});

window.onload = function(){
    document.getElementById("chat-btn").disabled = true;
}
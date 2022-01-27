// forcernew para forzar la connection
var socket= io.connect('http://localhost:6677', {'forceNew':true});
//cuando yo reciba el eveno de menssages que es evento que emitimos en el server
//data los datos que le llega desde el servidor
socket.on('messages', function(data){
    console.log(data);
    //rederizamos los datos
    render(data);
})
//la funcion reder va a pintar ese array de objetos que nos llegand esde el servidor y pintarlo en el html
//data son los datos quenos llegan desde el servidor
function render(data){
//la variable html hace un mapeo he itera data y va pintando el contenido de cada index y su valor dentro de la funcion  
    var html = data.map(function(messages, index){
        return (`
        <div class="servidor">
            <strong>${messages.nickname}</strong>
            <p>${messages.text}</p>
        </div>    
    `)
    }).join(" ");
    var div = document.querySelector("#message");
    div.innerHTML = html;
    div.scrollTop = div.scrollHeight;
}
 
//recibimos el evento que viene de html del formulario
function addMessage(e){
    //
    var datos = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value

    };
    // para que se quite el nombre de usuario y nos evuelva a actualizar
    document.getElementById('nickname').style.display= 'none';
    // vamos a emitir un evento del cliente al servidor para que se guarde en el servidor
    socket.emit('add-message', datos);
    // return false para que se corte la ejecucion
    return false;

}


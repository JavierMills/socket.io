var express = require('express');
var app = express();
var server = require('http').Server(app);
var io= require("socket.io")(server);
const cors = require('cors');
// cargamos un middleware donde va a cargar los archivos estaticos
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//de donde se estaran extrallendo las rutas 
app.use(express.static('client'));

app.get('/home', function(req, res){
    res.status(200).send("hola desde socket");
});
//creamos los datos de el chat
var messages =  [{
    id: 1,
    text:  'Bienvenido al chad privado de Javier',
    nickname: 'Bot Javier'
}]

//abrimos coneccion a socket, el metodo on nos permite lanzar eventos
io.on('connection', function(socket){//el metodo connection se encarga de recibir la conceuion de los clientes 
    console.log("Usuario conectado tiene la direccion ip : " + socket.handshake.address + "se ha conectado");
    //estamos emitiendo el mensaje cada ves que alguien se conecte
    socket.emit('messages', messages);
    //recogemos el evento add-mesages se lanza funcion de calback con los datos
    socket.on('add-message', function(data){
        //utilizamos el array messages para hacerle un push de data y lo gurdamos en el array los datos estaran  mientras el servisor siga corriendo
        messages.push(data);
        //emitimos a todos loe clientes conectados los mensajes de nuevo ya actualizados
        io.sockets.emit('messages', messages);
    });

});


server.listen(6677, function(){
    console.log("servidor esta funcionando en el http://localhost:6677");
});
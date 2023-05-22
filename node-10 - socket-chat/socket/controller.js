const { Socket } = require("socket.io");
const { comprobarJWT } = require("../helpers/generar-jwt");
const ChatData = require("../models/chat-data");

const chatData = new ChatData();

const socketController = async ( socket = new Socket(), io ) => {

    //console.log( 'cliente conectado', socket.id );

    const token = socket.handshake.headers['x-token'];
    const usuario = await comprobarJWT( token );
    
    if(!usuario){
        return socket.disconnect();
    }
    //agregar usuario conectado
    chatData.conectarUsuario(usuario);
    io.emit('usuarios-activos', chatData.usuariosArr);
    

    //desconectar usuario
    socket.on('disconnect', () => {
        chatData.desconectarUsuario( usuario.id );
        io.emit('usuarios-activos', chatData.usuariosArr);
    });

    socket.on('enviar-mensaje', ({ mensaje, uid }) => {
        chatData.enviarMensaje(usuario.id, usuario.nombre, mensaje);
        io.emit('recibir-mensajes', chatData.ultimos10);
    });




}


module.exports = socketController;
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
    socket.emit('recibir-mensajes', chatData.ultimos10);

    //conectar usuario conectado a una sala especial
    socket.join(usuario.id);

    //desconectar usuario
    socket.on('disconnect', (payload) => {
        console.log('se quieren desconectar', payload)
        chatData.desconectarUsuario( usuario.id );
        io.emit('usuarios-activos', chatData.usuariosArr);
        socket.disconnect();
    });

    socket.on('enviar-mensaje', ({ mensaje, uid }) => {

        if( uid ){
            //Mensaje Privado
            socket.to( uid ).emit('mensaje-privado', { de: usuario.nombre, mensaje });

        } else {   
            
            chatData.enviarMensaje(usuario.id, usuario.nombre, mensaje);
            io.emit('recibir-mensajes', chatData.ultimos10);

        }
    });




}


module.exports = socketController;
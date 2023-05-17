const { Socket } = require("socket.io");
const { comprobarJWT } = require("../helpers/generar-jwt");


const socketController = async ( socket = new Socket ) => {

    //console.log( 'cliente conectado', socket.id );

    const token = socket.handshake.headers['x-token'];
    const usuario = await comprobarJWT( token );
    
    if(!usuario){
        return socket.disconnect();
    }
    
    console.log( 'Cliente conectado! Bienvenido', usuario.nombre , '!')
}


module.exports = socketController;



class Mensaje{

    constructor(uid, nombre, msj){
        this.uid = uid;
        this.nombre = nombre;
        this.msj = msj;
    }
}

class ChatData {

    constructor(){
        this.mensajes = [];
        this.usuarios = {};
    }

    get ultimos10(){
        this.mensajes = this.mensajes.splice(0,10);
        return this.mensajes;
    }

    get usuariosArr(){
        return Object.values( this.usuarios );
    }

    enviarMensaje( uid, nombre, msj ){
        this.mensajes.unshift(
            new Mensaje(uid, nombre, msj)
        );
        console.log(this.mensajes)
    }

    conectarUsuario( usuario ){
        this.usuarios[ usuario.id ] = usuario;
    }

    desconectarUsuario( id ){
        delete this.usuarios[id];
    }

}

module.exports = ChatData;
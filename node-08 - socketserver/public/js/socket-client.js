

const lblOnline  = document.querySelector("#lblOn");
const lblOffline = document.querySelector("#lblOff");
const txtMsj     = document.querySelector("#txtMsj");
const btnEnviar  = document.querySelector("#btnEnviar");

const socket = io();


socket.on('connect', () => {
    console.log('Conectado!');

    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
    
    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
});

socket.on('enviar-msj', ( payload ) => {
    console.log( payload );    
});

btnEnviar.addEventListener( 'click', () => {
    const msj = txtMsj.value;
    const payload = {
        msj,
        id : 'idFicticio',
        date : new Date().getTime()
    }
    
    socket.emit( 'enviar-msj', payload);
});


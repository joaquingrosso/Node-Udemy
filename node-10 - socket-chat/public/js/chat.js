
var url = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/auth/'
            : 'https://restserver-curso-fher.herokuapp.com/api/auth/';

let usuario = null;
let socket = null;


//Referencias HTML 
const btnSalir = document.querySelector('#btnSalir');
const txtUid = document.querySelector('#txtUid');
const txtMsj = document.querySelector('#txtMsj');
const ulUsuarios = document.querySelector('#ulUsuarios');
const ulMensajes = document.querySelector('#ulMensajes');

//validar token del localStorage y lo renueva
const validarToken = async () => {

    const token = localStorage.getItem('token') || '';

    if (token.length <= 10) {
        window.location = 'index.html';
        throw new Error('No hay token en el servidor');
    }

    
    const resp = await fetch(url, {
        headers: { 'x-token': token }
        });
        
    const { usuario: usuarioDB, token: tokenDB} = await resp.json();

    localStorage.setItem('token', tokenDB); 
    usuario=usuarioDB;       
};


const conectarSocket = () => {

    socket = io({
        "extraHeaders" : {
            "x-token" : localStorage.getItem('token') 
        }
    });

    socket.on('connect', () => {
        console.log('Socket conectado!');
    });

    socket.on('disconnect', () => {
        console.log('Socket desconectado!');
    });

    socket.on('recibir-mensajes', () => {
        //TODO :
    });

    socket.on('usuarios-activos', () => {
        //TODO :
    });

    socket.on('mensaje-privado', () => {
        //TODO 
    });

};



const main = async () => {

    //valida el usuario sio tiene token para ingresar a la pantalla de chat
    await validarToken();
    conectarSocket();

};


main();
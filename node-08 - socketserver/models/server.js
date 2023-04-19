
const express = require('express');
const cors = require('cors');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);
        this.paths = {};

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();

        //Sockets
        this.sockets();
    };
    

    middlewares(){
        //CORS
        this.app.use( cors() );
        
        //Directorio publico 
        this.app.use(express.static('public'))
    };


    routes(){
        //this.app.use(this.paths.auth, require('../routes/auth_routes'));
    };


    sockets(){
        this.io.on('connection', socket => {
            console.log('Coneccion realizada! ', socket.id);


            socket.on('disconnect', () => {
                console.log('Coneccion cerrada! ',socket.id);
            });

            socket.on('enviar-msj', ( payload ) => {
                console.log( payload );
                this.io.emit("enviar-msj", "Respuesta del server");
            });



        });


    };

    listen(){
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: ', this.port);
        });
    };

}


module.exports = Server;
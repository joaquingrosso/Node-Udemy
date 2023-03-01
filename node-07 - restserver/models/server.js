
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath     = '/api/auth';
        //Conectar la BD
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    };
    
    middlewares(){
        //CORS
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use( express.json() );
        
        //Directorio publico 
        this.app.use(express.static('public'))
    };

    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuario_routes'));
        this.app.use(this.authPath, require('../routes/auth_routes'));
    };

    listen(){
        this.app.listen(this.port);
    };

    async conectarDB(){
        await dbConnection();
    }

}


module.exports = Server;
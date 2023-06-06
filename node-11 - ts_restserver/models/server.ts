
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import userRoutes from '../routes/usuario_routes';

class Server {

    private app  : express.Application;
    private port : string;
    private paths = {
        usuarios : '/api/usuarios'
    }

    constructor(){
        this.app  = express();
        this.port = process.env.PORT || '8000';

        this.middlewares();
        this.routes();
    }

    middlewares(){
        //cors
        this.app.use( cors() );

        //para poder leer el body
        this.app.use( express.json() );

        //carpeta publica
        this.app.use( express.static('public') );
    }

    routes(){
        this.app.use( this.paths.usuarios, userRoutes );
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puesto: ', this.port, '!');
        });
    };
}

export default Server;
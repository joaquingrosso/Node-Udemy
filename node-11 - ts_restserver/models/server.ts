
import dotenv from 'dotenv';
import express from 'express';

import userRoutes from '../routes/usuario_routes';

class Server {

    private app  : express.Application;
    private port : string;
    private paths = {
        usuarios : 'api/usuarios'
    }

    constructor(){
        this.app  = express();
        this.port = process.env.PORT || '8000';

        this.routes();
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
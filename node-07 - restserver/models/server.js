
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth : '/api/auth',
            categorias : '/api/categorias',
            usuarios : '/api/usuarios',
            productos : '/api/productos',
            buscar : '/api/buscar'
        };

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
        this.app.use(this.paths.auth, require('../routes/auth_routes'));
        this.app.use(this.paths.categorias, require('../routes/categorias_routes'));
        this.app.use(this.paths.usuarios, require('../routes/usuario_routes'));
        this.app.use(this.paths.productos, require('../routes/productos_routes'));
        this.app.use(this.paths.buscar, require('../routes/buscar_routes'));
    };

    listen(){
        this.app.listen(this.port);
    };

    async conectarDB(){
        await dbConnection();
    }

}


module.exports = Server;
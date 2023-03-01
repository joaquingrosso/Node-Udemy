const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');


const validarJWT = async ( req = request, res = response, next ) => {
    
    const token = req.header('Authorization');

    if( !token ){
        return res.status(401).json({
            msg: 'No se recibio token en esta peticion'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        const usuario = await Usuario.findById( uid );

        if( !usuario ){
            return res.status(401).json({
                msg: 'Token invalido! - Usuario inexistente'
            });
        }

        if( !usuario.estado ){
            return res.status(401).json({
                msg: 'Token invalido! - Usuario dado de baja'
            });
        }
        
        
        req.usuario = usuario;
        next();

    } catch(err) {
        console.log(err);
        res.status(401).json({
            msg: 'Token invalido!',            
        });
    }

}


module.exports={
    validarJWT
}
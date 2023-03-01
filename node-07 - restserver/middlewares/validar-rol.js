const { response, request } = require('express');

const esAdminRol = ( req = request, res = response, next ) => {

    if( !req.usuario ){
        return res.status(500).json({
            msg: 'Se quiere validar el rol antes de validar el token'
        });
    }

    const { rol, nombre } = req.usuario;

    if( rol !== 'ADMIN_ROL' ){
        return res.status(401).json({
            msg: `${nombre} no tiene los permisos necesarios para realizar esta accion`
        });
    }

    next();

}

const tieneRol = ( ...roles ) => {

    return ( req = request, res = response, next ) => {
        
        if( !req.usuario ){
            return res.status(500).json({
                msg: 'Se quiere validar el rol antes de validar el token'
            });
        }
        
        if( !roles.includes( req.usuario.rol ) ){
            return res.status(401).json({
                msg: `${req.usuario.nombre} no tiene los permisos necesarios para realizar esta accion`
            });
        }
        
        next();
    }

}



module.exports = {
    esAdminRol, tieneRol
}
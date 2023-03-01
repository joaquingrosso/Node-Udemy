const { response, request } = require('express');

const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async ( req, res = response) => {

    const {correo, password } = req.body;
    
    try {
        const usuario = await Usuario.findOne({ correo })

        //Verificar si existe correo
        if( !usuario ){
            return res.status(400).json({
                msg : 'Correo/Password incorrectos - correo'
            });;
        }

        //Verificar si el usuario esta activo
        if( usuario.estado === false ){
            return res.status(400).json({
                msg : 'Correo/Password incorrectos - estado : false'
            });;
        }

        //Verificar contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if( !validPassword ){
            return res.status(400).json({
                msg : 'Correo/Password incorrectos - password'
            });;
        }

        //Generar JWT
        const token = await generarJWT( usuario.id );

        res.json({
            msg : 'Login OK!',
            usuario,
            token
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            msg : `Algo salio mal!
                   Hable con el administrador`
        });
    }

}


module.exports = {
    login
}
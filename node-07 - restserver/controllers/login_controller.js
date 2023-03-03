const { response, request } = require('express');

const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');


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


const googleSignIn = async ( req, res = response) => {

    const { id_token } = req.body;

    try{
        // { nombre, correo, img }
        const { correo, nombre, img } = await googleVerify( id_token );    
        
        let usuario = await Usuario.findOne( { correo } );
        

        if( !usuario ){
            //creo un nuevo usaurio
            const data = {
                nombre, 
                correo, 
                password : ':P',
                img,
                google : true,
                rol : 'USER_ROL'
            }            
            
            usuario = new Usuario(data);
            
            //Encriptar contraseña
            const salt = bcryptjs.genSaltSync();
            usuario.password = bcryptjs.hashSync( usuario.password, salt );
            
            await usuario.save();

        }

        if( !usuario.estado ){
            res.status(401).json({
                msg : 'Hable con el administrador - Usuario Bloqueado!'
            });
        }

        //Generar JWT
        const token = await generarJWT( usuario.id );        


        res.json({
            msg : 'Google login OK!',
            google_token : id_token,
            usuario,
            jwt : token
        });

        

    } catch( err ) {
        res.status(400).json({
            msg : 'El token no se pudo verificar',
            err
        });
        console.log(err)
    }



}


module.exports = {
    login, googleSignIn
}
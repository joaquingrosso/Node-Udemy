
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuarioGet = (req = request, res = response) => {
    const  { q, nombre='no name' }  = req.query;

    res.json({
        msg: 'get API',
        q,
        nombre
    })
}

const usuarioPost = async (req, res = response) => {
    
   
    
    const { nombre, correo, password, rol } = req.body;
    //const { nombre, año } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });
    
    //Verificar si existe email
    const existeCorreo = await Usuario.findOne({ correo });
    if( existeCorreo ){
        return res.status(400).json({
            msg: 'El correo ingresado: ' + correo + ' ya existe.'
        });
    }

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( usuario.password, salt );
    //guardar usu
    await usuario.save();

    console.log('Usuario creado!');
    res.json({
        msg: 'post API',
        usuario
    })
}

const usuarioPut = (req, res = response) => {
    const { id } = req.params;

    res.json({
        msg: 'put API',
        id: id
    })
}

const usuarioDelete = (req, res = response) => {
    res.json({
        msg: 'delete API'
    })
}



module.exports = {
    usuarioGet, usuarioPost, usuarioPut, usuarioDelete
}
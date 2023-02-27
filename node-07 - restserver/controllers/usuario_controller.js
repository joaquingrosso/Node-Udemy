
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuarioGet = async (req = request, res = response) => {
    
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    // const usuarios = await Usuario.find( query )
    //     .limit( Number(limite) )
    //     .skip( Number(desde) );

    // const total = await Usuario.countDocuments( query );

    //ejecuta ambas al mismo tiempo
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
            .limit( Number(limite) )
            .skip( Number(desde) )
    ]);

    res.json({
        msg: 'get API',
        total, 
        usuarios 
    })
}

const usuarioPost = async (req, res = response) => {
    
    
    const { nombre, correo, password, rol } = req.body;
    //const { nombre, año } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });     
    
    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );
    //guardar usu
    await usuario.save();    
    
    console.log('Usuario creado!');
    res.json({
        msg: 'post API',
        usuario
    })
}

const usuarioPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, correo, google, ...resto } = req.body;

    //Validar contra BD
    if( resto.password ){        
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( resto.password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto);    

    res.json({
        msg: 'put API',
        id: id
    })
}

const usuarioDelete = async (req, res = response) => {
    
    const { id } = req.params;
    
    //Borrado Fisico
    //const usuario = await Usuario.findByIdAndDelete(id);

    //Borrado logico
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false });

    res.json({
        msg: 'delete API',
        id
    })
}



module.exports = {
    usuarioGet, usuarioPost, usuarioPut, usuarioDelete
}

const { response, request } = require('express');

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
    const body = req.body;
    //const { nombre, año } = req.body;

    const usuario = new Usuario(body);
    await usuario.save();

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
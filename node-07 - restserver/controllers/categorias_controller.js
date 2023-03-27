const { response, request } = require('express');
const { Categoria } = require('../models');


const crearCategoria = async ( req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if( categoriaDB ){
        return res.status(400).json({
            msg : `La categoria ${ categoriaDB.nombre } ya existe`
        });
    }

    const data = {
        nombre,
        usuario : req.usuario._id
    };

    const categoria = new Categoria( data );
    await categoria.save();

    return res.status(201).json({
        msg : 'Todo OK!',
        categoria
    });
}

const obtenerCategorias = async ( req, res = response ) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    //ejecuta ambas al mismo tiempo
    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments( query ),
        Categoria.find( query )
            .populate('usuario','nombre')
            .limit( Number(limite) )
            .skip( Number(desde) )
    ]);

    res.json({
        msg: 'get API',
        total, 
        categorias
    })
}

const obtenerCategoria = async ( req, res = response) => {
    const { id } = req.params;

    const categoriaDB = await Categoria.findById(id).populate('usuario','nombre');    

    return res.json({
        categoriaDB
    });
}

const updateCategoria = async ( req, res = response) => {
    const { id } = req.params;
    const {  estado, usuario, ...data } = req.body;    

    data.nombre = data.nombre.toUpperCase();

    const existePorNombre = await Categoria.findOne({ nombre : data.nombre });
    if( existePorNombre ){
        return res.status(401).json('El nombre que quieren cambiar ya exste como categoria');
    }
    data.usuario = req.usuario._id;

    const categoriaDB = await Categoria.findByIdAndUpdate( id, data , { new : true });    

    res.json({
        msg: 'Update realizado',
        categoriaDB
    })
}


const eliminarCategoria = async ( req, res = response) => {
    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate( id, { estado: false }, { new : true});
    const usuarioAutenticado = req.usuario

    res.json({
        msg: 'delete API',
        categoria,
        usuarioAutenticado
    })
}

module.exports = {
    crearCategoria, obtenerCategorias, obtenerCategoria, updateCategoria, eliminarCategoria
}
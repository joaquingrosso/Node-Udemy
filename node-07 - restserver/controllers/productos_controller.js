const { response, request } = require('express');
const { body } = require('express-validator');
const { Producto } = require('../models');



const obtenerProductos = async ( req, res = response ) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }
    
    //ejecuta ambas al mismo tiempo
    const [ total, productos ] = await Promise.all([
        Producto.countDocuments( query ),
        Producto.find( query )
        .populate('usuario','nombre')
        .populate('categoria','nombre')
        .limit( Number(limite) )
        .skip( Number(desde) )
    ]);
    
    res.json({
        msg: 'get API',
        total, 
        productos
    })
}

const obtenerProducto = async ( req, res = response) => {
    const { id } = req.params;
    
    const productoDB = await Producto.findById(id).populate('usuario','nombre').populate('categoria','nombre');    
    
    return res.json({
        productoDB
    });
}

const crearProducto = async ( req, res = response) => {
    const { nombre, usuario, ...body } = req.body;
    const nombreM = nombre.toUpperCase();

    const productoDB = await Producto.findOne({ nombreM });

    if( productoDB ){
        return res.status(400).json({
            msg : `El producto ${ productoDB.nombreM } ya existe`
        });
    }

    const data = {
        ...body,
        nombre : nombreM,
        usuario : req.usuario._id
    };

    const producto = new Producto( data );
    await producto.save();

    return res.status(201).json({
        msg : 'Todo OK!',
        producto
    });
}


const updateProducto = async ( req, res = response) => {
    const { id } = req.params;
    const {  estado, usuario, ...data } = req.body;
    
    
    
    if (data.nombre){
        data.nombre = data.nombre.toUpperCase();
        const existePorNombre = await Producto.findOne({ nombre : data.nombre });
        if( existePorNombre ){
            return res.status(401).json('El nombre que quieren cambiar ya exste como producto');
        }
    }

    data.usuario = req.usuario._id;

    const productoDB = await Producto.findByIdAndUpdate( id, data , { new : true });    

    res.json({
        msg: 'Update realizado',
        productoDB
    })
}


const eliminarProducto = async ( req, res = response) => {
    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate( id, { estado: false }, { new : true});
    const usuarioAutenticado = req.usuario

    res.json({
        msg: 'delete API',
        producto,
        usuarioAutenticado
    })
}

module.exports = {
    obtenerProductos, obtenerProducto, crearProducto, updateProducto, eliminarProducto
}
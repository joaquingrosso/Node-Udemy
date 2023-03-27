

const { response, request } = require('express');
const { ObjectId } = require('mongoose').Types;

const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const Producto = require('../models/producto');

const collecionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuario = async( termino = '', res = response ) => {

    const esMongoId = ObjectId.isValid( termino );

    if( esMongoId ){
        const usuario = await Usuario.findById( termino );
        res.json({
            result : (usuario) ? [usuario] : []
        });
    }

    const regex = new RegExp( termino, 'i' );

    const usuarios = await Usuario.find({ nombre : regex,  estado : true });

    res.json({
        result : usuarios
    });

};

const buscarProducto = async( termino = '', res = response ) => {

    const esMongoId = ObjectId.isValid( termino )
        

    if( esMongoId ){
        const producto = await Producto.findById( termino )
                                    .populate('usuario','nombre')
                                    .populate('categoria','nombre');
        res.json({
            result : (producto) ? [producto] : []
        });
    }

    const regex = new RegExp( termino, 'i' );

    const productos = await Producto.find(({ nombre : regex,  estado : true }))
                                .populate('usuario','nombre')
                                .populate('categoria','nombre');

    res.json({
        result : productos
    });

};



const buscarCategoria = async( termino = '', res = response ) => {

    const esMongoId = ObjectId.isValid( termino );

    if( esMongoId ){
        const categoria = await Categoria.findById( termino )
                                    .populate('usuario','nombre');  
        res.json({
            result : (categoria) ? [categoria] : []
        });
    }

    const regex = new RegExp( termino, 'i' );

    const categorias = await Categoria.find({
        $or : [{ nombre : regex }],
        $and : [{ estado : true }]
    })
    .populate('usuario','nombre');  

    res.json({
        result : categorias
    });

};


const buscar = async ( req, res = response ) => {

    const { coleccion, termino } = req.params;

    if ( !collecionesPermitidas.includes(coleccion) ){
        return res.status(400).json({
            msg : `Las colecciones permitidas son ${collecionesPermitidas}`
        });
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuario(termino, res);
        break;
        case 'categorias':
            buscarCategoria(termino, res);
        break;
        case 'productos':
            buscarProducto(termino, res);
        break;
        default:
            res.status(500).json({
                msg : `No se modelo una busqueda para esta coleccion`
            });
    }

    
}

module.exports = {
    buscar
}







// const buscarCategoria = async ( termino, res = response ) => {

//     const esMongoId = ObjectId.isValid( termino );

//     if( esMongoId ){
//         const categoria = await Categoria.findById( termino );
//         res.json({
//             result: (categoria) ? [categoria] : []
//         });
//     }

// };

// const buscarProducto = async ( termino, res = response ) => {

//     const esMongoId = ObjectId.isValid( termino );

//     if( esMongoId ){
//         const producto = await Producto.findById( termino );
//         res.json({
//             result: (producto) ? [producto] : []
//         });
//     }

// };

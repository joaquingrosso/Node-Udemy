const { response, request } = require('express');
const { subirArchivo } = require('../helpers');
const { Usuario, Producto } = require('../models');

const fs = require('fs');
const path = require('path');

const cargarArchivo = async( req, res = response )=> {

    try{
        const nombre = await subirArchivo(req.files, undefined, 'asdasd');
    
        res.json({
            nombre
        });
    } catch(err){
        res.status(400).json({
            msg: err
        });
    }

}


const actualizarImagen = async(req, res = response ) => {

    const { id, coleccion }  = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if( !modelo ) {
                return res.status(400).json({
                    msg : `No existe el usuario con el id ${id}`
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if( !modelo ) {
                return res.status(400).json({
                    msg : `No existe el producto con el id ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({ msg : 'Coleccion no validada' })
    }

    //limpiar imagen previa 
    if( modelo.img ){
        const pathIMG = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if( fs.existsSync( pathIMG ) ){
            fs.unlinkSync( pathIMG );
        }
    }


    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;
    await modelo.save();

    res.json({
        modelo
    });
}

const descargarArchivo = async(req, res = response ) => {

    const { id, coleccion }  = req.params;

    let modelo;
    const no_image = path.join(__dirname, '../assets/no-image.jpg');
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if( !modelo ) {
                return res.status(400).json({
                    msg : `No existe el usuario con el id ${id}`
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if( !modelo ) {
                return res.status(400).json({
                    msg : `No existe el producto con el id ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({ msg : 'Coleccion no validada' })
    }

    //limpiar imagen previa 
    if( modelo.img ){
        const pathIMG = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if( fs.existsSync( pathIMG ) ){
            console.log('aaaaaaaa')
            return res.sendFile( pathIMG );
        }
    }

    res.sendFile( no_image );
    
}

module.exports = {
    cargarArchivo, actualizarImagen, descargarArchivo
}
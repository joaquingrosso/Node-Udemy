
const { Categoria, Producto } = require('../models');
const Rol = require('../models/rol');
const Usuario = require('../models/usuario');

const esRolValido = async ( rol = '' ) => {

    const existeRol = await Rol.findOne({ rol });
    if( !existeRol ){
        throw new Error(`El rol ${ rol } no existe`);
    }
    
}

const existeCorreo = async( correo = '' ) => {

    if( await Usuario.findOne({ correo }) ){
        throw new Error(`El correo ingresado: ${correo} ya existe`);        
    } 

}

const existeCategoria = async( id = '' ) => {
    
    const existe = await Categoria.findById(id);
    if( !existe ){
        throw new Error(`El id ingresado: ${id} no existe`);        
    } 
    
}


const existeProducto = async( id = '' ) => {
    
    const existe = await Producto.findById(id);
    if( !existe ){
        throw new Error(`El id ingresado: ${id} no existe`);        
    } 


}


const existeId = async( id = '' ) => {
    const existe = await Usuario.findById( id );
    if( !existe ){
        throw new Error(`El id ingresado: ${id} no existe`);        
    } 

}


module.exports = {
    esRolValido, existeCorreo, existeId, existeCategoria, existeProducto
}
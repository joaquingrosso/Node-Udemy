const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, tieneRol } = require('../middlewares');

const { 
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    updateProducto,
    eliminarProducto
} = require('../controllers/productos_controller');

const { existeProducto, existeCategoria } = require('../helpers/db-validators');


const router = new Router();


router.get('/', obtenerProductos);

router.get('/:id', [
    check('id','No es un id valido').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
    ], obtenerProducto);

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de mongo valido').isMongoId(),
    check('categoria', 'No existe la categoria que indican').custom( existeCategoria ),
    validarCampos
    ], crearProducto);

router.put('/:id', [
    validarJWT,
    check('id','No es un id valido').isMongoId(),
    check('id').custom( existeProducto ),
    check('categoria','No es un id de mongo valido').optional().isMongoId(),
    validarCampos
    ], updateProducto);

router.delete('/:id', [
    validarJWT,
    tieneRol('ADMIN_ROL'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
    ], eliminarProducto);


module.exports = router;
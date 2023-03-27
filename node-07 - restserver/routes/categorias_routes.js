const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, tieneRol } = require('../middlewares');

const { 
    crearCategoria, 
    obtenerCategoria, 
    updateCategoria, 
    eliminarCategoria, 
    obtenerCategorias 
} = require('../controllers/categorias_controller');

const { existeCategoria } = require('../helpers/db-validators');


const router = new Router();


router.get('/', obtenerCategorias);

router.get('/:id', [
    check('id','No es un id valido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
    ], obtenerCategoria);

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
    ], crearCategoria);

router.put('/:id', [
    validarJWT,
    check('id','No es un id valido').isMongoId(),
    check('id').custom( existeCategoria ),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
    ], updateCategoria);

router.delete('/:id', [
    validarJWT,
    tieneRol('ADMIN_ROL'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
    ], eliminarCategoria);


module.exports = router;
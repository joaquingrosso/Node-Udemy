const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares');

const { cargarArchivo, actualizarImagen, descargarArchivo } = require('../controllers/upload_controller');
const { coleccionesPermitidas } = require('../helpers');
const validarArchivo = require('../middlewares/validar-archivo');


const router = new Router();


router.post('/', validarArchivo, cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivo,
    check('id','EL id debe ser un id de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','productos'] ) ),
    validarCampos
], actualizarImagen);

router.get('/:coleccion/:id', [
    check('id','EL id debe ser un id de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','productos'] ) ),
], descargarArchivo);

module.exports = router;


const { Router } = require('express');
const { check, body } = require('express-validator');

const { usuarioGet, usuarioPost, usuarioPut, usuarioDelete } = require('../controllers/usuario_controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = new Router();

router.get('/', usuarioGet);
//1° parametro: ruta
//2° parametro: middleware, se pueden mandar como arreglo (si hay 3 params)
//  --el middleware se corre antes que el controlador
//3° parametro: controlador
router.post('/', [
    check('nombre', 'EL nombre es obligatorio').not().isEmpty(),
    check('password', 'EL password debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('correo','El correo no es valido').isEmail()   ,
    check('rol','No es un rol valido').isIn(['ADMIN_ROL','USER_ROL']),
    validarCampos
], usuarioPost);

router.put('/:id', usuarioPut);

router.delete('/', usuarioDelete);


module.exports = router;
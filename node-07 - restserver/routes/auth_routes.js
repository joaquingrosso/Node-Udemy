const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/login_controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = new Router();


router.post('/login', [
    check('password','La contraseña es obligatoria').not().isEmpty(),
    check('correo','El correo no es valido').isEmail(),
    validarCampos
], login);


module.exports = router;
const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/login_controller');
const { validarCampos } = require('../middlewares');

const router = new Router();


router.post('/login', [
    check('password','La contraseña es obligatoria').not().isEmpty(),
    check('correo','El correo no es valido').isEmail(),
    validarCampos
], login);


router.post('/google', [
    check('id_token','El id_token es necesario').not().isEmpty(),
    validarCampos
], googleSignIn);


module.exports = router;


const { Router } = require('express');
const { check } = require('express-validator');

const { usuarioGet, usuarioPost, usuarioPut, usuarioDelete } = require('../controllers/usuario_controller');
const { esRolValido, existeCorreo, existeId } = require('../helpers/db-validators');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
//const { esAdminRol, tieneRol } = require('../middlewares/validar-rol');
const {
    validarCampos,
    validarJWT, 
    esAdminRol, 
    tieneRol
} = require('../middlewares');

const router = new Router();

router.get('/', usuarioGet);
//1° parametro: ruta
//2° parametro: middleware, se pueden mandar como arreglo (si hay 3 params)
//  --el middleware se corre antes que el controlador
//3° parametro: controlador
router.post('/', [
    check('nombre', 'EL nombre es obligatorio').not().isEmpty(),    
    check('password', 'EL password debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom( existeCorreo ),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROL','USER_ROL']),
    check('rol').custom( esRolValido ),  //check('rol').custom( rol => esRolValido(rol) ),    
    validarCampos
], usuarioPost);

router.put('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom( existeId ),
    check('rol').custom( esRolValido ), 
    validarCampos
], usuarioPut);

router.delete('/:id',[
    validarJWT,
    //esAdminRol,
    tieneRol('ADMIN_ROL','SUPER_ROL'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom( existeId ),
    validarCampos
], usuarioDelete);


module.exports = router;
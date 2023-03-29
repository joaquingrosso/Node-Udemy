


const db_validators = require('./db-validators');
const generarJWT = require('./generar-jwt');
const googleVerify = require('./google-verify');
const subir_archivo = require('./subir-archivo');

module.exports = {
    ...db_validators,
    ...generarJWT,
    ...googleVerify,
    ...subir_archivo
}
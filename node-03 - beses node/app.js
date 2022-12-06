
const { crearArchivoMultiplicar } = require('./helpers/multiplicar');
const { base, listar } = require('./config/yargs');


crearArchivoMultiplicar(base, listar)
    .then( nombreArchivo => console.log(nombreArchivo, ' creado'))
    .catch( err => console.log(err))




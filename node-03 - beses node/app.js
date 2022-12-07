
const { crearArchivoMultiplicar } = require('./helpers/multiplicar');
const { base, listar, hasta} = require('./config/yargs');


crearArchivoMultiplicar(base, listar, hasta)
    .then( nombreArchivo => console.log(nombreArchivo, ' creado'))
    .catch( err => console.log(err))




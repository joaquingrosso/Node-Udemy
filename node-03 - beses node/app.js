

const { number, boolean } = require('yargs');
const { crearArchivoMultiplicar } = require('./helpers/multiplicar')
const argv = require('yargs')
                .option('b', {
                        alias: 'base',
                        type: 'number',
                        demandOption: true,
                })
                .option('l',{
                        alias: 'listar',
                        type: 'boolean',
                        default: false
                })                
                .check( (argv,option) => {
                    if ( isNaN(argv.b) ){
                        return 'La base tiene que ser un numero'
                    }
                    return true;
                }).argv;



const base = argv.b;
const listar = argv.l;

// console.log(argv);



crearArchivoMultiplicar(base, listar)
    .then( nombreArchivo => console.log(nombreArchivo, ' creado'))
    .catch( err => console.log(err))




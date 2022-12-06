const argv = require('yargs')
                .option('b', {
                        alias: 'base',
                        type: 'number',
                        demandOption: true,
                        describe: 'Es la base de la tabla a multiplicar'
                })
                .option('l',{
                        alias: 'listar',
                        type: 'boolean',
                        default: false,
                        describe: 'Muestra la tabla en consola'
                })                
                .check( (argv,option) => {
                    if ( isNaN(argv.b) ){
                        return 'La base tiene que ser un numero'
                    }
                    return true;
                }).argv;


module.exports = {
    base   : argv.b,
    listar : argv.l
}                
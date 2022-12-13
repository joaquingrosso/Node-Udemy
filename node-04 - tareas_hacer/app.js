const { mostrarMenu, pausa } = require('./helpers/mensajes');

require('colors');

require('./helpers/mensajes')



const main = async() => {

    let opt='';
    
    do {
        opt = await mostrarMenu();
        console.log('Opcion selec: ', opt);
        
        if (opt !== '0') await pausa();
        
    } while (opt !== '0');

}

main();
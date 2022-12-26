
require('dotenv').config()

const { inquirerMenu, inquirerPausa, leerInput, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

console.clear();


const main = async()  => {
    
    const busquedas = new Busquedas();
    let opt;

    do {
        opt = await inquirerMenu();

        switch(opt){
            case 1:
                const lugar = await leerInput('Ciudad: ');

                const lugares = await busquedas.ciudad(lugar);

                const id = await listarLugares(lugares);

                const lugarSel = lugares.find( l => l.id === id);                                

                console.log(`\nInformacion de la ciudad:`.green, lugares.name, `\n`);
                console.log('Latitud: ',lugarSel.lat);
                console.log('Longitud: ',lugarSel.lng);
                console.log('Temperatura: ',0);
                console.log('Minima: ',0);
                console.log('Maxima: ',0);
            break;
            case 2:
                //historial
            break;
            case 0:
                
            break;
        }

        if (opt != 0) await inquirerPausa();     

    } while (opt != 0);
    
}

main();
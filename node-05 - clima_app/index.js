
require('dotenv').config()

const { inquirerMenu, inquirerPausa, leerInput, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

console.clear();


const main = async()  => {
    
    const busquedas = new Busquedas();
    let opt;
    busquedas.leerDB();
    do {
        opt = await inquirerMenu();

        switch(opt){
            case 1:
                const lugar = await leerInput('Ciudad: ');

                const lugares = await busquedas.ciudad(lugar);

                const id = await listarLugares(lugares);
                if( id === '0' ) continue;

                const lugarSel = lugares.find( l => l.id === id);     

                busquedas.agregarHistorial(lugarSel.name);
                
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);

                console.log(`\nInformacion de la ciudad:`.green, lugarSel.name, `\n`);
                console.log('Latitud: ',lugarSel.lat);
                console.log('Longitud: ',lugarSel.lng);
                console.log('Temperatura: ',clima.temp);
                console.log('Minima: ',clima.min);
                console.log('Maxima: ',clima.max);
                console.log('Como esta el clima: ',clima.desc);
            break;
            case 2:
                //historial
                console.log();
                busquedas.historialCapitalizado.forEach( (lugar,i) => {                    
                    const idx = `${ i + 1 }`.green;
                    console.log(`${idx} ${lugar}`);                    
                });
                console.log();
            break;
        }

        if (opt != 0) await inquirerPausa();     

    } while (opt != 0);
    
}

main();
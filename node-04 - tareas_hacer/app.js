
require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, inquirerPausa, leerInput } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

console.clear();

const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if ( tareasDB ){
        tareas.cargarFromArray(tareasDB);
    }


    do {
        opt = await inquirerMenu();
        console.log('\n');

        switch(opt){
            case '1':
                //crear
                const desc = await leerInput('Descripcion: ')
                tareas.crearTarea(desc);
            break;
            case '2':
                //listar
                console.log(tareas.listadoArr);
            break;
            case '3':
                //lsitar
            break;
            case '4':
                //lsitar
            break;
            case '5':
                //lsitar
            break;
            case '6':
                //lsitar
            break;
            case '0':
                //lsitar
            break;
        }

        guardarDB( tareas.listadoArr ); 

        if (opt !== '0') await inquirerPausa();        
        
    } while (opt !== '0');

}

main();
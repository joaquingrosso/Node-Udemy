
require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, inquirerPausa, leerInput, listadoTareasBorrar, listadoTareasCompletar, confirmar } = require('./helpers/inquirer');
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
                const desc = await leerInput('Descripcion: ');
                const okC = await confirmar('Seguro que desea borrar?');
                if (okC){
                    tareas.crearTarea(desc);
                }
            break;
            case '2':
                //listar todo
                tareas.listadoCompleto();
            break;
            case '3':
                //listar pendientes
                tareas.listadoPendientes();
            break;
            case '4':
                //listar completadas
                tareas.listadoCompletadas();
            break;
            case '5':
                //completar
                const ids = await listadoTareasCompletar(tareas.listadoArr)
                tareas.toggleCompletadas(ids);
            break;
            case '6':
                //borrar
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if( id===0 ){
                    const okB = await confirmar('Seguro que desea borrar?');
                    if (okB){
                        tareas.borrarTarea(id);                    
                    }
                }
            break;
            case '0':
                //salir
                
            break;
        }

        guardarDB( tareas.listadoArr ); 

        if (opt !== '0') await inquirerPausa();        
        
    } while (opt !== '0');

}

main();
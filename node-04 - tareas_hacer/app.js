
require('colors');

const { inquirerMenu, inquirerPausa, leerInput } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

console.clear();

const main = async() => {

    let opt = '';
    const tareas = new Tareas();
    
    do {
        opt = await inquirerMenu();
        console.log('\n');

        switch(opt){
            case '1':
                //crear
                const desc = await leerInput('Descripcion: ')
                tareas.crearTarea(desc);
                await inquirerPausa();
            break;
            case '2':
                //listar
                console.log(tareas.listadoArr);
                await inquirerPausa();
            break;
            case '3':
                //lsitar
                await inquirerPausa();
            break;
            case '4':
                //lsitar
                await inquirerPausa();
            break;
            case '5':
                //lsitar
                await inquirerPausa();
            break;
            case '6':
                //lsitar
                await inquirerPausa();
            break;
            case '0':
                //lsitar
            break;
        }
        
    } while (opt !== '0');

}

main();
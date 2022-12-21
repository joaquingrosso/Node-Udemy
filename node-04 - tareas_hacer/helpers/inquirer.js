
require('colors')
const inquirer = require('inquirer');

const preguntas = [
    {
        type: 'list',
        name: 'option',
        message: 'Que desea hacer?',
        choices: [            
            {
                value: '1',
                name: `${ '1.'.green } Crear tarea`
            },
            {
                value: '2',
                name: `${ '2.'.green } Listar tareas`
            },
            {
                value: '3',
                name: `${ '3.'.green } Listar tareas pendientes`
            },
            {
                value: '4',
                name: `${ '4.'.green } Listar tareas completadas`
            },
            {
                value: '5',
                name: `${ '5.'.green } Completar tarea(s)`
            },
            {
                value: '6',
                name: `${ '6.'.green } Borrar tarea`
            },
            {
                value: '0',
                name: `${ '0.'.green } Salir`
            }
        ]
    }
]


const inquirerMenu = async() =>{
    
    console.clear();

    console.log('============================='.green);
    console.log('    Seleccione una opcion    '.green);
    console.log('============================='.green);    


    const {option} = await inquirer.prompt(preguntas);
    return option;
};

const inquirerPausa = async() => {

    return await inquirer.prompt({
          type :  'input',
           name:  'enter',
        message:  `Presione ${ 'Enter'.green} para continuar`
    });
}

const leerInput = async( mensaje ) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message: mensaje,
            validate( value ){
                if( value.length === 0 ){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}


const listadoTareasBorrar = async( tareas = [] ) => {
    
    const choices = tareas.map( (tarea, i) => {

        return {
            value : tarea.id,
            name : `${i+1}.`.green + tarea.desc
        }

    });

    choices.unshift({
        value : '0',
        name : '0.'.green + 'Cancelar'            
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const {id} = await inquirer.prompt(preguntas);

    return id;
}

const listadoTareasCompletar = async( tareas = [] ) => {
    
    const choices = tareas.map( (tarea, i) => {

        return {
            value : tarea.id,
            name : `${i+1}.`.green + tarea.desc,
            checked : (tarea.completadoEn) ? true : false
        }

    });    

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(preguntas);

    return ids;
}

const confirmar = async ( message ) => {
    const question = [
        {
            type : 'confirm',
            name : 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;

}

module.exports = {
    inquirerMenu, inquirerPausa, leerInput, listadoTareasBorrar, confirmar,listadoTareasCompletar
}





require('colors')
const inquirer = require('inquirer');


const preguntas = [
    {
        type: 'list',
        name: 'option',
        message: 'Que desea hacer?',
        choices: [            
            {
                value: 1,
                name: `${ '1.'.green } Buscar Ciudad`
            },
            {
                value: 2,
                name: `${ '2.'.green } Historial`
            },
            {
                value: 0,
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


const listarLugares = async( lugares = [] ) => {
    
    const choices = lugares.map( (lugar, i) => {

        return {
            value : lugar.id,
            name : `${i+1}.`.green + lugar.name
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
            message: 'seleccione un lugar',
            choices
        }
    ]

    const {id} = await inquirer.prompt(preguntas);

    return id;
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
    inquirerMenu, inquirerPausa, leerInput, listarLugares, confirmar
}




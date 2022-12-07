

const fs = require('fs');
const colors = require('colors');

async function crearArchivoMultiplicar(base, listar, hasta){
    try { 
        
        let salida = '';
        let consola = '';
        for (let i = 1; i <= hasta; i++) {
            consola  += `${ base } ${ colors.green('x') } ${ i } ${ colors.green('=') } ${ colors.bold(base * i) }\n`;
            salida += `${ base } x ${ i } = ${ base * i }\n`  
        };

        if(listar){
            console.log(colors.green('================='));
            console.log('Tabla del ', colors.blue(base));
            console.log('================='.green);
            console.log( consola);
        }

        fs.writeFileSync(`./salida/tabla-${ base }.txt`, salida );

        return colors.rainbow(`tabla-${ base }.txt`);

    } catch (error) {
        throw error;
    }
}

module.exports = {
    crearArchivoMultiplicar
}
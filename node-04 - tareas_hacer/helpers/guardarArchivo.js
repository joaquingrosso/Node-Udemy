
const fs = require('fs');

const archivo = './DB/data.json'

const guardarDB = ( data ) => {


    fs.writeFileSync(archivo, JSON.stringify(data) );
};

const leerDB = () => {
    if( !fs.existsSync(archivo) ) null;

    const info = fs.readFileSync( archivo, { encoding : 'UTF-8' } );
    
    const data = JSON.parse(info);

    return data;
};

module.exports = {
    guardarDB, leerDB
}
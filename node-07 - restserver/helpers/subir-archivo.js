
const path = require('path');
const { v4: uuid } = require('uuid');

const subirArchivo = ( files, extensionesPermitidas = ['png','jpeg','jpg','gif'], carpeta='' ) => {
    
    return new Promise( (resolve, reject) => {
        
        const { archivo } = files;
        
        //validar extension
        const nombreSplit = archivo.name.split('.');
        const extension = nombreSplit[ nombreSplit.length -1 ];
        
        if( !extensionesPermitidas.includes(extension) ){
            return reject(`La extension ${extension} no esta permitida. Extensiones permitidas: ${extensionesPermitidas}`);
        }
    
        const nombreTemp = uuid() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);
    
        archivo.mv(uploadPath, err => {
            if (err) {
                return reject(err);
            }
    
            resolve(nombreTemp);
        });
        
    });
}



module.exports = {
    subirArchivo
}
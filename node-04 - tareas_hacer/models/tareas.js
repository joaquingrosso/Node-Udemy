
const Tarea = require("./tarea");


class Tareas {
    
    _listado = {}; 

    constructor(){
        this._listado = {};
    }

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach( keys => {
            listado.push( this._listado[keys] );
        });
        return listado;
    }

    cargarFromArray( listado = [] ){
        listado.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea( desc = '' ){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    borrarTarea ( id = '' ){
        if( this._listado[id]){
            delete this._listado[id];
        }
    }

    listadoCompleto(){
        this.listadoArr.forEach( (tarea, i) => {
            let indice = `${ i +1 }`.green;
            let { desc , completadoEn } = tarea;
            let estado = (completadoEn) ? 'Completado'.green : 'Pendiente'.red;
            console.log(`${indice} ${desc} :: ${estado}`);            
        });
        console.log();
    }

    listadoCompletadas(){
        this.listadoArr.forEach( (tarea, i) => {
            let { completadoEn } = tarea;
            if(completadoEn !== null){
                let { desc } = tarea;
                let indice = `${ i +1 }`.green;            
                let estado = (completadoEn) ? 'Completado'.green : 'Pendiente'.red;
                console.log(`${indice} ${desc} :: ${estado}`);                
            }            
        });
        console.log();
    }

    listadoPendientes(){
        this.listadoArr.forEach( (tarea, i) => {
            let { completadoEn } = tarea;
            if(completadoEn == null){
                let { desc } = tarea;
                let indice = `${ i +1 }`.green;            
                let estado = (completadoEn) ? 'Completado'.green : 'Pendiente'.red;
                console.log(`${indice} ${desc} :: ${estado}`);                
            }            
        });
        console.log();
    }

    toggleCompletadas( ids = [] ){
        ids.forEach( id => {
            const tarea = this._listado[id];
            if( !tarea.completadoEn ){
                tarea.completadoEn=new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea => {
            if( !ids.includes(tarea.id) ){
                this._listado[tarea.id].completadoEn=null;
            }
        });

    }
}



module.exports = Tareas;
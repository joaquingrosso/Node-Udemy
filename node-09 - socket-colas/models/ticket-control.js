
const fs = require('fs');
const path = require('path');


class Ticket {
    
    constructor( numero, escritorio ){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor(){
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];
        
        this.init();
    }

    init(){
        const { hoy, ultimo, tickets, ultimos4 } = require('../db/data.json')
        if( hoy === this.hoy ){
            this.ultimo = ultimo;            
            this.tickets = tickets;
            this.ultimos4 = ultimos4;            
        } else {
            //Es otro dia
            this.guardarDB();
        }
    }
    
    guardarDB(){
        const dbpath = path.join( __dirname + '/../db/data.json' );
        console.log( dbpath );
        fs.writeFileSync( dbpath, JSON.stringify( this.toJSON ) ); 
    }


    get toJSON(){
        return {
            ultimo   : this.ultimo,
            hoy      : this.hoy,
            tickets  : this.tickets ,
            ultimos4 : this.ultimos4
        }
    }

    siguiente(){
        this.siguiente += 1;
        const ticket = new Ticket( this.ultimo, null);
        this.tickets.push( ticket );

        this.guardarDB();

        return 'Ticket ' + this.numero;
    }

    atenderTicket( escritorio ){
        
        if( this.tickets.lenght === 0 ){
            return null;
        }

        const ticket = this.tickets.shift();

        ticket.escritorio = escritorio;

        this.ultimos4.unshift( ticket );

        if( this.ultimos4.length > 4 ){
            this.ultimos4.splice(-1, 1);
        }

        this.guardarDB();

        return ticket;
    }



}

module.exports = TicketControl;

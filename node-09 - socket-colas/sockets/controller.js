const TicketControl = require("../models/ticket-control");
const ticketControl = new TicketControl();


const socketController = (socket) => {
    
    console.log('Cliente conectado', socket.id );
    //cuando se conecta un cliente
    socket.emit('ultimo-ticket', ticketControl.ultimo);
    socket.emit('estado-actual', ticketControl.ultimos4);
    socket.emit('tickets-pendientes', ticketControl.tickets.length);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id );
    });

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguiente();
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);
        callback(siguiente);

        //TODO notificar que hay un tiket pendiente de asignar        
    })

    socket.on('atender-ticket', ( {escritorio}, callback ) => {
        
        if( !escritorio ){
            return callback({
                ok : false,
                msj : 'El escritorio es necesario'
            });
        }

        const ticket = ticketControl.atenderTicket(escritorio);

        socket.broadcast.emit('estado-actual', ticketControl.ultimos4);
        socket.emit('tickets-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

        if( !ticket ){
            return callback({
                ok : false,
                msj : 'No hay tickets pendientes'
            });
        } else {
            return callback({
                ok : true,
                ticket
            });
        }

    });
}



module.exports = {
    socketController
}


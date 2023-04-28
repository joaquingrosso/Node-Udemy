

const lblNuevoTicket = document.querySelector('#lblNuevoTicket'); //busca por id
const btnCrear       = document.querySelector('button');          //primer boton que encuentre

const socket = io();


socket.on('connect', () => {
    btnCrear.disabled = false;

});

socket.on('disconnect', () => {
    btnCrear.disabled = true;
});

socket.on('ultimo-ticket', ( ultimo ) => {
    lblNuevoTicket.innerText = `Ticket  ${ultimo}`;
});



btnCrear.addEventListener( 'click', () => {
    
    //sin payload
    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        console.log('Cliente solicita ticket, ', ticket);
        lblNuevoTicket.innerText = ticket;
    });

});
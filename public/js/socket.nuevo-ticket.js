// Comando para establecer la conexión
var socket = io();
var label = $('#lblNuevoTicket'); //Este Id esta definido en nuevo-ticket.html

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

// on escucha cunado se emita el 'estadoActual'
socket.on('estadoActual', function(resp) {
    console.log('estadoActual', resp);
    label.text(resp.actual);
});

//todos los botones al hacer click en la pantalla ejecutan esta funcion
//Id definido en nuevo-ticket.html
$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
});
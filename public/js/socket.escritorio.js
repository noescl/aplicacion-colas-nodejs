// Comando para establecer la conexión
var socket = io();

//obteniendo los parametros por URL
var searchParams = new URLSearchParams(window.location.search);
console.log(searchParams);

//pregunta si existe el parametro 'escritorio'
if (!searchParams.has('escritorio')) {
    window.location = 'index.html'; //me salgo de pantalla
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');
console.log(escritorio);
$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        if (resp === 'No hay tickets') { //respuesta seteada en ticket-control.js funcion atenderTicket().
            label.text(resp);
            alert(resp);
            return;
        }
        label.text('Ticket ' + resp.numero);
    });
});
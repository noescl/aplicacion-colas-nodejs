const fs = require('fs');

class Ticket {
    //# Ticket y que escritorio lo va atender
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    constructor() {
            this.ultimo = 0;
            this.hoy = new Date().getDate();
            this.tickets = [];
            this.ultimos4 = [];

            let data = require('../data/data.json');
            console.log(data);
            console.log('HOYYYYY:', data.hoy, ' HOY:', this.hoy);
            if (data.hoy === this.hoy) {
                this.ultimo = data.ultimo;
                this.tickets = data.tickets;
                this.ultimos4 = data.ultimos4;
            } else {
                this.reiniciarConteo();
            }
        }
        ///////////////////////////////////////////
    siguiente() {
            this.ultimo += 1;
            let ticket = new Ticket(this.ultimo, null);
            this.tickets.push(ticket); //agregando al arreglo de tickets

            this.grabarArchivo();
            return `Ticket ${ this.ultimo }`;
        }
        ///////////////////////////////////////////
    getUltimoTicket() {
            return `Ticket ${ this.ultimo }`;
        }
        ///////////////////////////////////////////        
    getUltimos4() {
            return this.ultimos4;
        }
        ///////////////////////////////////////////
    atenderTicket(escritorio) {
            if (this.tickets.length === 0) {
                return 'No hay tickets';
            }

            //obtener el # del primer ticket
            let numeroTicket = this.tickets[0].numero;

            //Borrar elementos de un arreglo (primera posicion)
            this.tickets.shift();

            //Creando new instancia porque es ticket a atender
            let atenderTicket = new Ticket(numeroTicket, escritorio);

            //colocar el ticket al inicio del arreglo
            this.ultimos4.unshift(atenderTicket);

            if (this.ultimos4.length > 4) {
                this.ultimos4.splice(-1, 1); // borra el último
            }

            console.log('Ultimos 4');
            console.log(this.ultimos4);

            this.grabarArchivo();

            return atenderTicket;

        }
        ///////////////////////////////////////////    
    reiniciarConteo() {
            this.ultimo = 0;
            this.tickets = [];
            this.ultimos4 = [];

            console.log('Se ha inicializado el sistema');
            this.grabarArchivo();
        }
        ///////////////////////////////////////////
    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}
module.exports = { TicketControl }
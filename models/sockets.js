
class Sockets{

    constructor( io ){
        this.io = io ;

        this.socketEvents();
    }

    socketEvents(){
        // On connection
        this.io.on('connection', (socket) => {  // socket = cliente que se conecto

            //el servidor escucha al cliente y emite el mensaje en la consola del servidor
            socket.on('mensaje-to-server', (data) => { //on => Escucha
                console.log(data);
                //el servidor notifique a todos los clientes
                //socket.emit('mensaje-from-server', data); // lo emite al socket que disparo el mensaje
                this.io.emit('mensaje-from-server', data); // lo emite a todos los conectados
            });
        });

    }


}


module.exports = Sockets;
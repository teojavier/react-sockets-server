const ConnectedList = require("./connected-list");

class Sockets {

    constructor(io) {
        this.io = io;
        this.usersConnected = new ConnectedList();
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {  // socket = cliente que se conecto
            //console.log('cliente conectado', socket.id);


            socket.on('unirse-sala', (room, idUser) => {
                //console.log(room, idUser);
                this.usersConnected.addConnected(idUser, room, socket.id);
                socket.join(room);
                this.io.to(room).emit('user-connected',this.usersConnected.getConnected().filter( user => user.diagramId == room ));
                //console.log();
            });

            socket.on('send-diagram', (datagrama, room) => {
                this.io.to(room).emit('diagram-updated',datagrama);
            });

            
            socket.on('disconnect', () => {
                this.usersConnected.getRoom(socket.id);
                this.usersConnected.getUserId(socket.id);
                this.usersConnected.removeConnected( socket.id );
                this.io.to(this.usersConnected.diagramId).emit('user-disconnected', this.usersConnected.userId);
            });

        });

    }


}


module.exports = Sockets;
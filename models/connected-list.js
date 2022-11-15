const Connected = require("./connected");

class ConnectedList{

    constructor(){
        this.usersConnected = [];
        this.diagramId;
        this.userId;
    }

    addConnected( userId, diagramId, socketId ){
        const newConnected = new Connected( userId, diagramId, socketId );

        this.usersConnected.push( newConnected ); 
        return this.usersConnected;
    }

    removeConnected( socketId ){
        this.usersConnected = this.usersConnected.filter( user => user.socketId !== socketId); 
    }

    getConnected(){
        return this.usersConnected;
    }

    getConnectedForRoom( diagramId ){
        const data = this.usersConnected.filter( user => user.diagramId == diagramId ); 
        return data;
    }


    getRoom( socketId ){
        this.usersConnected = this.usersConnected.map( user => {

            if( user.socketId === socketId){
                this.diagramId = user.diagramId;
            }
            return user;

        });

    }

    getUserId( socketId ){
        this.usersConnected = this.usersConnected.map( user => {

            if( user.socketId === socketId){
                this.userId = user.userId;
            }
            return user;

        });
    }
   
}

module.exports = ConnectedList;
const express = require('express');
const userRouter=require ('./routes/users')
class Server {
    constructor(){
        this.app = express(); //Se instancia Express
        this.port = 3000;    //Definimos el puerto

        //paths   http://localhost:3000/api/v1 
        this.basePath = '/api/v1';   //Ruta base
        this.usersPath = `${this.basePath}/users`;//Path para la tabla users

        this.middlewares(); //Invocacion de los middlewares

        this.routes();
    }

    middlewares(){
        this.app.use(express.json()) //Para poder interpretar texto en formato JSON
    }

    routes(){
        this.app.use(this.usersPath, userRouter); //EndPoint de users
    }

    listen (){
        this.app.listen(this.port, () =>{
            console.log("Server listening on port"+ this.port )
        });
}
}
module.exports = Server;
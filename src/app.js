const express = require('express');
const routes = require('./routes/routes.js');
import mongoose from 'mongoose';

class App{
    constructor(){
        mongoose.connect('mongodb+srv://Senac:pp4OVozu11KkCWTq@projeto-senac.atkatyd.mongodb.net/?retryWrites=true&w=majority');
        this.server = express();
        this.middlewares();
        this.routes();
    };
    middlewares(){
        this.server.use(express.json());
    };
    routes(){
        this.server.use(routes);
    };
};
module.exports = new App().server;
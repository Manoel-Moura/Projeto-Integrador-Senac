const express = require('express');
const routes = require('./routes');
import mongoose from 'mongoose';
class App{
    constructor(){
        mongoose.connect('mongodb+srv://senac:lpiBZPIquHMvoQjE@projeto-senac.atkatyd.mongodb.net/?retryWrites=true&w=majority');
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

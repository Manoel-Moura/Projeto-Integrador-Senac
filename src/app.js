const express = require('express');
const routes = require('./routes/routes.js');
import mongoose from 'mongoose';
import session from 'express-session';
import fs from 'fs'; 
import path from 'path';

class App {
    constructor() {
        mongoose.connect('mongodb+srv://senacProjeto:senacProjeto@playersony.gmakrpl.mongodb.net/?retryWrites=true&w=majority');
        this.server = express();
        this.middlewares();
        this.routes();
    };
    middlewares() {
        this.server.use('/assets', express.static(path.join(__dirname, 'front/assets')));
        this.server.use(express.json());
        this.server.use(session({
            secret: '2032030230203023023dlsldsmaklepqwkl123=-1231-=23', //Nada seguro isso kkkk
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false }
        }));
        this.server.use(express.urlencoded({ extended: true }));
    };
    routes() {
        this.server.use(routes);
    };
};

module.exports = new App().server;

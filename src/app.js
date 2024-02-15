const express = require('express');
const routes = require('./routes/routes.js');
import mongoose from 'mongoose';
import session from 'express-session';
import fs from 'fs'; 
import path from 'path';
const bodyParser = require('body-parser'); 

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
            secret: '2032030230203023023dlsldsmaklepqwkl123=-1231-=23', 
            resave: false,
            saveUninitialized: true,
            cookie: { 
                secure: false,
                maxAge: 15 * 60 * 1000 
            }
        }));        
        this.server.use(bodyParser.urlencoded({ extended: true }));
        this.server.use(express.urlencoded({ extended: true }));
    };
    routes() {
        this.server.use(routes);
    };
};

module.exports = new App().server;

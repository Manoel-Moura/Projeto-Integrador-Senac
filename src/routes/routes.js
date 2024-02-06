const {Router} = require('express');
import cadastroReceita from "../controller/ReceitaController"
import crudUser from "../controller/UserController"
import CategoriaController from "../controller/CategoriaController"
import multer from 'multer';
import multerConfig from '../multerConfig';
const upload = multer(multerConfig);

const express = require('express');
import path from 'path'


const routes = new Router();


// Rotas das receitas
routes.get('/cadastroReceita', cadastroReceita.show);
routes.get('/receitaUser', cadastroReceita.showReceita);
routes.delete('/cadastroReceita', cadastroReceita.delete);
routes.post('/cadastroReceita', upload.single('foto'), cadastroReceita.store);
routes.put('/cadastroReceita', cadastroReceita.update);


routes.post('/curtidasReceita', cadastroReceita.curtidasReceita);
routes.post('/favoritaReceita', cadastroReceita.favoritaReceita);


//Rotas relacionadas as categorias das receitas
routes.post('/criarCategoria', CategoriaController.store);
routes.get('/criarCategoria', CategoriaController.show);
routes.put('/criarCategoria', CategoriaController.update);
routes.delete('/criarCategoria', CategoriaController.delete);

//Para atribuir os valores ao card
routes.get('/createCard', cadastroReceita.createCard);


//Rotas dos Usuarios
routes.post('/cadastroUser', crudUser.store);
routes.get('/cadastroUser', crudUser.show);
routes.put('/cadastroUserT', upload.single('fotoUsuario'), crudUser.edit);
routes.delete('/cadastroUser', crudUser.delete);
routes.get('/user', crudUser.getUserDataBody);


//Rota de login: usuario
routes.post('/login', crudUser.login);
routes.get('/check-login', crudUser.checkLogin);

//Rotas para recuperação de senha
routes.post('/requestPasswordReset', crudUser.requestPasswordReset);
routes.post('/resetPassword', crudUser.resetPassword);

//Pegar os dados do usuario, individual
routes.get('/getUserData', crudUser.getUserData);

//Rota virtual para carregar as imagens, salvas pelo multer
routes.use('/uploads', express.static(path.join(__dirname, '../front/assets/media/uploads')));

module.exports = routes;
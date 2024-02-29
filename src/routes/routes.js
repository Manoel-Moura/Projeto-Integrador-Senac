const { Router } = require('express');
const { requireLogin, serveProtectedPage, servePage, redirectIfLoggedIn, requireResetToken, validateCaptcha, verifyRecipeOwner } = require('./config');

import cadastroReceita from "../controller/ReceitaController"
import crudUser from "../controller/UserController"
import CategoriaController from "../controller/CategoriaController"
import multer from 'multer';
import multerConfig from '../multerConfig';
import path from 'path';

const upload = multer(multerConfig);
const express = require('express');
const routes = new Router();

// Rotas das receitas
routes.get('/cadastroReceita/:id', cadastroReceita.show);
routes.get('/receitaUser', cadastroReceita.showReceita);
routes.delete('/deletarReceita', cadastroReceita.delete);
routes.post('/cadastroReceita', upload.single('foto'), cadastroReceita.store);
routes.put('/editarReceitas/:id', upload.single('foto'), cadastroReceita.update);
routes.get('/mostrarReceita', cadastroReceita.showAll)

// routes.get('/receitasUser', cadastroReceita.receitasUser);


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
routes.post('/cadastroUser', upload.none(), validateCaptcha, crudUser.store);
routes.get('/cadastroUser', crudUser.show);
routes.put('/cadastroUserT', upload.single('fotoUsuario'), crudUser.edit);
routes.delete('/cadastroUser', crudUser.delete);
routes.get('/user', crudUser.getUserDataBody);


//Rota de login: usuario
routes.post('/login', validateCaptcha, crudUser.login);
routes.get('/check-login', crudUser.checkLogin);
routes.get('/logout', crudUser.logout);

//Rotas para recuperação de senha
routes.post('/requestPasswordReset', validateCaptcha, crudUser.requestPasswordReset);
routes.post('/resetPassword', validateCaptcha, crudUser.resetPassword);

//Pegar os dados do usuario, individual
routes.get('/getUserData', crudUser.getUserData);

//Rota virtual para carregar as imagens, salvas pelo multer
routes.use('/uploads', express.static(path.join(__dirname, '../front/assets/media/uploads')));


// Proteger de usuários logados
routes.get('/login', redirectIfLoggedIn, servePage('../front/pages/login.html'));
routes.get('/cadastroCliente', redirectIfLoggedIn, servePage('../front/pages/cadastroCliente.html'));
routes.get('/formulario', redirectIfLoggedIn, servePage('../front/pages/formulario.html'));

//Proteger de usuários sem token
routes.get('/recuperarSenha', requireResetToken, servePage('../front/pages/recuperarSenha.html'));

// Para usuarios não logados
routes.get('/cadastroCliente', servePage('../front/pages/cadastroCliente.html'));
routes.get('/chefes', servePage('../front/pages/chefes.html'));
routes.get('/formulario', servePage('../front/pages/formulario.html'));
routes.get('/home', servePage('../front/pages/home.html'));
routes.get('/login', servePage('../front/pages/login.html'));
routes.get('/perfildochef', servePage('../front/pages/perfildochef.html'));
routes.get('/sobre', servePage('../front/pages/sobre.html'));
routes.get('/verReceitas', servePage('../front/pages/verReceitas.html'));

//Só para usuários logados
routes.get('/adicionarReceita', requireLogin, serveProtectedPage('../front/pages/adicionarReceita.html'));
routes.get('/editarReceita', requireLogin, verifyRecipeOwner, serveProtectedPage('../front/pages/editarReceita.html'));
routes.get('/dashboard', servePage('../front/pages/dashboard.html'));
routes.get('/editarDadosPessoais', requireLogin, serveProtectedPage('../front/pages/editarDadosPessoais.html'));


routes.get('/rankingChefs', crudUser.rankingChefs);


module.exports = routes;
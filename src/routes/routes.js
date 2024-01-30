const {Router} = require('express');
import cadastroReceita from "../controller/ReceitaController"
import crudUser from "../controller/UserController"
import multer from 'multer';
import multerConfig from '../multerConfig';
const upload = multer(multerConfig);

const routes = new Router();


// Rotas das receitas
routes.get('/cadastroReceita', cadastroReceita.show);
routes.get('/receitaUser', cadastroReceita.showReceita);
routes.delete('/cadastroReceita', cadastroReceita.delete);
routes.post('/cadastroReceita', upload.single('foto'), cadastroReceita.store);
routes.put('/cadastroReceita', cadastroReceita.update);




//Rotas dos Usuarios
routes.post('/cadastroUser', crudUser.store);
routes.get('/cadastroUser', crudUser.show);
routes.put('/cadastroUser', crudUser.edit);
routes.delete('/cadastroUser', crudUser.delete);

//Rota de login
routes.post('/login', crudUser.login);
routes.get('/check-login', crudUser.checkLogin);


module.exports = routes;
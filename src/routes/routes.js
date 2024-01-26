const {Router} = require('express');
import cadastroReceita from "../controller/ReceitaController"
import crudUser from "../controller/UserController"

const routes = new Router();


// Rotas das receitas
routes.get('/cadastroReceita', cadastroReceita.show);
routes.get('/receitaUser', cadastroReceita.showUser);

routes.post('/cadastroReceita', cadastroReceita.store);

routes.put('/cadastroReceita/:id', cadastroReceita.update);


//Rotas dos Usuarios
routes.post('/cadastroUSer', crudUser.store);

routes.get('/cadastroUSer', crudUser.show);

routes.put('/cadastroUSer', crudUser.edit);

routes.delete('/cadastroUSer', crudUser.delete);



module.exports = routes;
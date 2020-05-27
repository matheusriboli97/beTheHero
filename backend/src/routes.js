const express = require('express')

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get( '/profile', ProfileController.index);//lista casos específicos de uma ong

routes.get('/incidents', IncidentController.index);//no insomnia nao precisa do header de autenticação
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id',IncidentController.delete);//recebo um route param com o id do incidente pra saber qual vou deletar

module.exports = routes;//exportando as rotas para utiliza-las no index
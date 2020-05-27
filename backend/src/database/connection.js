const knex = require('knex');
const configuration = require('../../knexfile');//../ para voltar pastas

const connection = knex(configuration.development); //passo a configuração de desenvolvimento

module.exports = connection;

//Para login
const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();//vai me retornar apenas um resultado, nao um array

        if (!ong) {//se essa ong nao existir
            return response.status(400).json({ error: 'No ONG found with this ID' });//status 400 => bad request, alguma coisa deu errado
        }
        
        return response.json(ong);
    }
}
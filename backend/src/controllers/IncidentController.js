const connection = require('../database/connection');

module.exports = {
    async index(request, response) {

        const { page = 1 } = request.query;//busco o parametro page q se nao existir sera por default = 1
        // esse parametro page ele pega na propria url!! Lembrar do query param ( passado na url http://....?page=2)
        const [count] = await connection('incidents').count();//A variável count é a quantidad de casos.A funcao count() retorna um array, por isso coloco [], poderia colocar dentro de count e depois chamar count [0]
        //vou retornar no cabeçalho da resposta                         

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')//trago os dados da ong em que o id coincide com o ig da ong relacionada ao incidente => ongs.id = incidents.ong_id
            .limit(5)//retorna apenas 5 registros
            .offset((page - 1) * 5)//ele decide aqui a partir de qual registro vai começar. Na pagina 1 por exemplo comeca do 0, na página 2 do 5 ...
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf']);//seleciono todos os dados do incidente e varios da ong, nao coloco tudo pq senao o id da ong sobrepoe o do incidente

        response.header('X-Total-Count', count['count(*)']);//resposta da qtd de casos no cabeçalho

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;//guarda informacoes do contexto da requisicao  (inclusive a autenticação). Esse authorization vem da variavel q eu coloquei no headers no insomnia

        const [id] = await connection('incidents').insert({//pego a primeira posicao de um vetor resultado q no caso será o id. Poderia chamar de const result e retornar um result[0]
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;//busco o id da ong 

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')//so preciso dessa coluna
            .first();//me retorna apenas um resultado

        if (incident.ong_id != ong_id) {//vejo se a ong que esta tentando acessar é de fato a ong que teve o incidente
            return response.status(401).json({ error: 'opperation not permitted.' });//caso contrario retorno um erro. Status 401 é p/ erros
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();//esse status 204 é quando vamos retornar uma resposta p/ o frontend q nao tem conteudo. Send p/ enviar a resposta sem corpo nenhum 
    }
};
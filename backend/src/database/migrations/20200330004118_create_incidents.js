exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table) {
        table.increments();//chave primaria q se auto incrementa
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        table.string('ong_id').notNullable();
        table.foreign('ong_id').references('id').inTable('ongs');//a chave estrangeira criada acima (ong_id) referencia a coluna id na tabela ongs
    });  
};

exports.down = function(knex) {
    knex.schema.dropTable('incidents');
};

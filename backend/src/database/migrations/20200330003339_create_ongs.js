exports.up = function(knex) {
    return knex.schema.createTable('ongs', function(table) {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf',2).notNullable();//certeza q o tamanho é de 2 caracteres
    });
};

exports.down = function(knex) {
    knex.schema.dropTable('ongs');
};

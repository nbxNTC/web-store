
exports.up = function(knex) {
    return knex.schema.createTable('products', function(table) {
        table.increments('id').primary();         
        table.string('title').notNullable(); 
        table.string('plataform').notNullable(); 
        table.decimal('value').notNullable(); 
        table.string('image').notNullable();     
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('products');
};

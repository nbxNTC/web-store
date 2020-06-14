
exports.up = function(knex) {
    return knex.schema.createTable('products', function(table) {
        table.increments();         
        table.string('title').notNullable(); 
        table.string('plataform').notNullable(); 
        table.decimal('value').notNullable(); 
        table.string('imgURL').notNullable();     
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('products');
};

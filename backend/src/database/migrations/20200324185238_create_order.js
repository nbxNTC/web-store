
exports.up = function(knex) {
    return knex.schema.createTable('order', function(table) {
        table.increments();         
        table.string('name').notNullable();        
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('order');
};

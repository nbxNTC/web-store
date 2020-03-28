
exports.up = function(knex) {
    return knex.schema.createTable('orders', function(table) {
        
        table.increments();            
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.string('value').notNullable(); 

        table.string('client_id').notNullable(); 
        table.foreign('client_id').references('id').inTable('profiles');

    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('orders');
};

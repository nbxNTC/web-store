
exports.up = function(knex) {
  return knex.schema.createTable('product_owner', function(table) {
    
    table.increments('id').primary();        
    table.integer('product_id')
      .notNullable()
      .references('id')
      .inTable('products');
    table.integer('owner_id')
      .notNullable()
      .references('id')
      .inTable('profiles');   
     
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('product_owner');
};

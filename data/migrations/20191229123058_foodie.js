
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments()
      tbl.string('username', 128).unique().notNullable();
      tbl.string('password', 128).notNullable();
      tbl.string('location', 128).notNullable();
      tbl.string('email', 128).unique().notNullable();
    })
    .createTable('restaurants', tbl => {
      tbl.increments()
      tbl.string('name', 128).unique().notNullable();
      tbl.string('cuisine', 128).notNullable();
      tbl.string('location', 128).notNullable();
      tbl.integer('opens').notNullable();
      tbl.integer('closes').notNullable();
      tbl.float('rating').notNullable()
      tbl.binary('photos').nullable()
    })
    .createTable('reviews', tbl => {
      tbl.increments()
      tbl.integer('restaurant_id').unsigned().notNullable().references('id').inTable('restaurants').onUpdate('CASCADE').onDelete('CASCADE')
      tbl.string('cuisine', 128).notNullable();
      tbl.string('menuItemName', 128).notNullable();
      tbl.binary('photo').nullable()
      tbl.decimal('price').notNullable();
      tbl.float('rating').notNullable();
      tbl.text('review').notNullable();  

    })

};

exports.down = function(knex) {
  dropTableIfExists('users')
  dropTableIfExists('restaurants')
  dropTableIfExists('reviews')
};

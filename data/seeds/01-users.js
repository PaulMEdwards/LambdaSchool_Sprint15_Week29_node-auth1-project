const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  return knex('users').insert([
    {username: 'test', password: bcrypt.hashSync('test', 12)},
  ]);
};

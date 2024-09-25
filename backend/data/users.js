const bcrypt = require('bcryptjs');
const users = [
  {
    name: 'admin user',
    email: 'admin@email.com',
    password: bcrypt.hashSync('1234567', 10),
    isAdmin: true,
  },
  {
    name: 'john doe',
    email: 'john@email.com',
    password: bcrypt.hashSync('1234567', 10),
    isAdmin: false,
  },
  {
    name: 'jane doe',
    email: 'jane@email.com',
    password: bcrypt.hashSync('1234567', 10),
    isAdmin: false,
  },
];
module.exports = users;

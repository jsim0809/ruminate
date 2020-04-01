const { Client } = require('pg');
const dbconf = require('../config/db_config');

const createClient = () => {
  return new Client({
    user: dbconf.role,
    host: dbconf.host,
    database: 'reviews',
    password: dbconf.password,
    port: 5432
  });
};

module.exports = createClient;

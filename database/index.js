const { Pool } = require('pg');
const dbconf = require('../../sdc-data/config/postgres_config.js');

const pool = new Pool({
  user: dbconf.user,
  host: dbconf.host,
  database: 'reviews',
  password: dbconf.password,
  port: 5432,
  idleTimeoutMillis: 0,
});

pool.connect()

module.exports.getAllReviews = (restaurantId, callback) => {
  let queryID = Number(restaurantId).toString(36);
  pool.query(`SELECT * FROM reviews WHERE key='${queryID}'`)
    .then((res) => {
      callback(null, res.rows);
    })
    .catch((err) => {
      callback(err);
    });
};




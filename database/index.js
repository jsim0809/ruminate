const arangojs = require('arangojs');
const db = new arangojs.Database();
const dbconf = require('../config/db_config');

db.useDatabase('_system');
db.useBasicAuth(dbconf.user, dbconf.password);

module.exports.getAllReviews = (restaurantId, callback) => {
  db.query(`FOR review IN reviews FILTER review.z == ${restaurantId} RETURN { review }`)
    .then((cursor) => cursor.all())
    .then((reviews) => {
      callback(null, reviews);
    })
    .catch((error) => {
      callback(error);
    });
};

module.exports.getSummary = (restaurantId, callback) => {
  // get restaurant summary info from restaurant table
  const client = createClient();
  const sql = squel.select()
    .from('restaurants')
    .field('restaurants.location')
    .field('restaurants.noise')
    .field('restaurants.recommendpercent', 'recommendPercent')
    .field('restaurants.valuerating', 'valueRating')
    .field('restaurants.averageoverall', 'averageOverall')
    .field('restaurants.averagefood', 'averageFood')
    .field('restaurants.averageambience', 'averageAmbience')
    .field('restaurants.averageservice', 'averageService')
    .where(`id = ${restaurantId}`)
    .toString();

  makeQuery(client, sql, callback);
};

const createClient = require('./pg_client.js');
const squel = require('squel');

const makeQuery = (client, sql, callback) => {
  client.connect()
    .then(() => {
      client.query(sql)
        .then((res) => {
          callback(null, res.rows);
          client.end();
        })
        .catch((err) => {
          callback(err);
          client.end();
        });
    })
    .catch((err) => {
      callback(err);
      client.end();
    });
};

module.exports.getAllReviews = (restaurantId, callback) => {
  const client = createClient();

  const sql = `SELECT 
    reviews.id, 
    reviews.restaurant,
    reviews.text,
    reviews.date,
    reviews.overall,
    reviews.food,
    reviews.service,
    reviews.ambience,
    reviews.wouldrecommend,
    reviews.tags,
    diners.firstname,
    diners.lastname,
    diners.city,
    diners.avatarcolor,
    diners.isvip,
    diners.totalreviews
    from reviews INNER JOIN diners 
    on (reviews.diner = diners.id) 
    where reviews.restaurant = ${restaurantId}`;

  makeQuery(client, sql, callback);
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

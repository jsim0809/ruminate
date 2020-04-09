const arangojs = require('arangojs');
const db = new arangojs.Database();
const dbconf = require('../../sdc-data/config/arango_config.js');

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

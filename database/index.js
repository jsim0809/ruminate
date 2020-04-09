const arangojs = require('arangojs');
const db = new arangojs.Database();
const dbconf = require('../../sdc-data/config/arango_config.js');

db.useDatabase('_system');
db.useBasicAuth(dbconf.user, dbconf.password);

module.exports.getAllReviews = (restaurantId, callback) => {
  let queryID = `r/${Number(restaurantId).toString(36)}`;
  db.query(`RETURN DOCUMENT("${queryID}")`)
    .then((cursor) => cursor.all())
    .then((reviews) => {
      callback(null, reviews);
    })
    .catch((error) => {
      callback(error);
    });
};

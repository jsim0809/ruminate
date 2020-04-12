const fs = require ('fs');
const arangojs = require('arangojs');
const dbconf = require('../../sdc-data/config/arango_config.js');

const db = new arangojs.Database({
  url: "http://54.245.152.205:8529"
});

db.useDatabase('_system');
db.useBasicAuth(dbconf.user, dbconf.password);

const reviewsCollection = db.collection('r');

const buffer = fs.readFileSync('../../sdc-data/reviews_1m_zip.json');

async function seed() {
  await reviewsCollection.import(buffer, { type: 'documents' })
}

seed();
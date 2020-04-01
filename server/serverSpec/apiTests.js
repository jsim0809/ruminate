const request = require('supertest');
const server = require('../index.js').listen(3010);

module.exports = {
  runAll() {
    this.testSummaryRoute();
    this.testReviewsRoute();
  },

  testSummaryRoute() {
    request(server)
      .get('/2/impression')
      .expect(200)
      .expect((res) => {
        console.log('Testing summary GET...');
        const actual = typeof res.body[0].location;
        if (actual === 'string') {
          console.log('Success: Body property "location" is of type "string"');
          return true;
        }
        console.log(`Failure: Expected "string" to equal ${actual}`);
        return false;
      })
      .end((err, res) => {
        if (err) {
          console.log(res);
        }
        server.close();
      });
  },

  testReviewsRoute() {
    request(server)
      .get('/2/reviews')
      .expect(200)
      .expect((res) => {
        console.log('Testing reviews GET...');
        const actual = res.body[0].id;
        if (typeof actual === 'number') {
          console.log('Success: Body id is of type "number"');
          return true;
        }
        console.log(`Failure: expected "number" to equal ${actual}`);
        return false;
      })
      .expect((res) => {
        const actual = res.body[0];
        if (typeof res.body === 'object') {
          console.log('Success: Body is of type "object"');
          return true;
        }
        console.log(`Failure: expected "object" to equal ${actual}`);
        return false;
      })
      .end((err, res) => {
        if (err) {
          console.log(res);
        }
        server.close();
      });
  }
};

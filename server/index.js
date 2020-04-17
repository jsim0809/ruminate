const path = require('path');
const cors = require('cors');
const express = require('express');
const db = require('../database/index.js');
const redis = require('redis');
const redisClient = redis.createClient();

const app = express();

app.use(cors());
app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/loaderio-4f01e8a708a961122a8102ec195a46e3', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'loaderio-4f01e8a708a961122a8102ec195a46e3.txt'));
});

app.get('/:id', (req, res) => {
  if (!req.params.id) {
    res.status(400);
    res.end();
  } else {
    res.status(200);
    res.sendFile('index.html', { root: path.resolve(__dirname, '../public') });
  }
});

app.get('/:id/reviews', (req, res) => {
  redisClient.get(req.params.id, (err, cached) => {
    if (cached) {
      res.status(200);
      res.send(cached);
    } else {
      db.getAllReviews(req.params.id, (err, result) => {
        if (err) {
          res.status(500);
          res.end();
        } else {
          redisClient.setex(req.params.id, 3600, JSON.stringify(result));
          res.status(200);
          res.send(result);
        }
      });
    }
  });
});

module.exports = app;

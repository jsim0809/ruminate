const fs = require('fs');
const Faker = require('faker');
const moment = require('moment');

const Seed10m = {
  foodWords: ['pot roast', 'chicken', 'sushi', 'marshmallows', 'pumpkin pie', 'wine'],
  tagWords: ['groups', 'kids', 'gluten free', 'vegan'],
  noiseLevels: ['Quiet', 'Average', 'Loud'],
  colors: ['#d86441', '#bb6acd', '#6c8ae4', '#df4e96'],
  getRandomFoodWord() {
    return Seed10m.foodWords[Math.floor(Math.random() * Seed10m.foodWords.length)];
  },
  getRandomTagWord() {
    return Seed10m.tagWords[Math.floor(Math.random() * Seed10m.tagWords.length)];
  },
  getRandomNoiseLevel() {
    return Seed10m.noiseLevels[Math.floor(Math.random() * Seed10m.noiseLevels.length)];
  },
  getRandomColor() {
    return Seed10m.colors[Math.floor(Math.random() * Seed10m.colors.length)];
  },
  lowProbabilityRandom() {
    return Math.random() > 0.8;
  },
  fixFloatPrecision(float) {
    let number = float;
    if (typeof float !== 'string') {
      number = float.toString();
    }
    number = number.split('.');
    if (number[1]) {
      if (number[1].slice(0, 1) === '0') {
        return number[0];
      }
      return `${number[0]}.${number[1].slice(0, 1)}`;
    }
    return number[0];
  },
  createRestaurants() {
    //  create 5 restaurants and store them in a CSV
    const restaurants10m = './restaurants10m.csv';
    for (let i = 0; i < 5;) {
      let restaurant = '';
      // name
      restaurant += Faker.lorem.word() + ',';
      // location
      restaurant += Faker.address.city().replace(/'/g, '') + ',';
      // noise
      restaurant += Seed10m.getRandomNoiseLevel() + ',';
      // recommendpercent
      restaurant += Faker.random.number({ min: 0, max: 100 }) + ',';
      // averageoverall
      restaurant += Seed10m.fixFloatPrecision(Faker.random.number({ min: 0, max: 5, precision: 0.1 })) + ',';
      // averageservice
      restaurant += Seed10m.fixFloatPrecision(Faker.random.number({ min: 0, max: 5, precision: 0.1 })) + ',';
      // averageambience
      restaurant += Seed10m.fixFloatPrecision(Faker.random.number({ min: 0, max: 5, precision: 0.1 })) + ',';
      // averagefood
      restaurant += Seed10m.fixFloatPrecision(Faker.random.number({ min: 0, max: 5, precision: 0.1 })) + ',';
      // valuerating
      restaurant += Seed10m.fixFloatPrecision(Faker.random.number({ min: 0, max: 5, precision: 0.1 })) + '\n';
      // Write to CSV and increment i
      fs.write(restaurants10m, restaurant, (err) => {
        if (err) {
          console.error(err);
        } else {
          i += 1;
        }
      });
    }
  },
  createDiners() {
    //  create 50 diners and store them in a CSV
    const diners = [];
    for (let i = 0; i < 50; i++) {
      const diner = {};
      diner.firstname = Faker.name.firstName().replace(/'/g, '');
      diner.lastname = Faker.name.lastName().replace(/'/g, '');
      diner.city = Faker.address.city().replace(/'/g, '');
      diner.totalreviews = Faker.random.number({ min: 0, max: 25 });
      diner.avatarcolor = Seed10m.getRandomColor();
      diner.isVIP = Seed10m.lowProbabilityRandom();
      diners.push(diner);
    }
    return diners;
  },
  createReviews() {
    //  create 600 reviews and store them in a CSV
    const reviews = [];
    for (let i = 0; i < 600; i++) {
      const review = {};
      review.restaurant = Faker.random.number({ min: 1, max: 5 });
      review.diner = Faker.random.number({ min: 1, max: 50 });
      review.text = Faker.lorem.sentences();
      if (Math.random() > 0.7) {
        review.text += ` ${Faker.lorem.sentences()}`;
      }
      review.date = moment(Faker.date.recent(365)).format('YYYY-MM-DD');
      review.overall = Faker.random.number({ min: 1, max: 5 });
      review.food = Faker.random.number({ min: 1, max: 5 });
      review.service = Faker.random.number({ min: 1, max: 5 });
      review.ambience = Faker.random.number({ min: 1, max: 5 });
      review.wouldrecommend = Faker.random.boolean();
      review.tags = '';
      for (let j = 0; j < 2; j++) {
        if (Math.random() > 0.8) {
          if (review.tags[0]) {
            review.tags += ',';
          }
          review.tags += Seed10m.getRandomFoodWord();
          if (Math.random() > 0.9) {
            review.tags += `,${Seed10m.getRandomTagWord()}`;
          }
        }
      }
      reviews.push(review);
    }
    return reviews;
  },
 
};

Seed10m.createRestaurants();
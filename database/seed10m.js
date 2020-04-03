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
  async createRestaurants() {
    // create 10 million restaurants and store them in a CSV
    let restaurants10mStream = fs.createWriteStream('../../sdc-data/restaurants10m.csv', { flags: 'a' }); // CHECK THIS WHEN RERUNNING SCRIPT
    for (let i = 5000001; i <= 10000000; i += 1) { // CHECK THIS WHEN RERUNNING SCRIPT
      let restaurant = '';
      // id
      restaurant += i + ',';
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
      // Write to CSV
      let ok = restaurants10mStream.write(review);
      if (!ok) {
        await new Promise((resolve, reject) => {
          restaurants10mStream.once('drain', resolve);
        });
      };
    }
    restaurants10mStream.end();
    restaurants10mStream.on('finish', () => {
      console.log('Successfully appended 5m entries to restaurants10m.csv. Total 10m.');
    });
    restaurants10mStream.on('error', () => {
      console.error('Error: write failed.');
    });
  },
  async createDiners() {
    // create 1 million diners and store them in a CSV
    // 0.1 diners per restaurant
    let diners1mStream = fs.createWriteStream('../../sdc-data/diners1m.csv', { flags: 'a' }); // CHECK THIS WHEN RERUNNING SCRIPT
    for (let i = 1; i <= 1000000; i += 1) { // CHECK THIS WHEN RERUNNING SCRIPT
      let diner = '';
      // id
      diner += i + ',';
      // firstname
      diner += Faker.name.firstName().replace(/'/g, '') + ',';
      // lastname
      diner += Faker.name.lastName().replace(/'/g, '') + ',';
      // city
      diner += Faker.address.city().replace(/'/g, '') + ',';
      // avatarcolor
      diner += Seed10m.getRandomColor() + ',';
      // isvip
      diner += Seed10m.lowProbabilityRandom() + ',';
      // totalreviews
      diner += Faker.random.number({ min: 0, max: 25 }) + '\n';
      // Write to CSV
      let ok = diners1mStream.write(review);
      if (!ok) {
        await new Promise((resolve, reject) => {
          diners1mStream.once('drain', resolve);
        });
      };
    }
    diners1mStream.end();
    diners1mStream.on('finish', () => {
      console.log('Successfully appended 1m entries to diners1m.csv.');
    });
    diners1mStream.on('error', () => {
      console.error('Error: write failed.');
    });
  },
  async createReviews() {
    // create 200 million reviews and store them in a CSV
    // 20 reviews per restaurant
    let reviews200mStream = fs.createWriteStream('../../sdc-data/reviews50m_4.csv', { flags: 'a' }); // CHECK THIS WHEN RERUNNING SCRIPT
    for (let i = 170000001; i <= 200000000; i += 1) { // CHECK THIS WHEN RERUNNING SCRIPT
      let review = '';
      // id
      review += i + ',';
      // restaurant
      review += Faker.random.number({ min: 1, max: 10000000 }) + ',';
      // diner
      review += Faker.random.number({ min: 1, max: 1000000 }) + ',';
      // text
      review += Faker.lorem.sentences();
      if (Math.random() > 0.7) {
        review.text += ` ${Faker.lorem.sentences()}`;
      }
      review += ',';
      // date --- TODO: last 3 months
      review += moment(Faker.date.recent(365)).format('YYYY-MM-DD') + ',';
      // overall
      review += Faker.random.number({ min: 1, max: 5 }) + ',';
      // food
      review += Faker.random.number({ min: 1, max: 5 }) + ',';
      // service
      review += Faker.random.number({ min: 1, max: 5 }) + ',';
      // ambience
      review += Faker.random.number({ min: 1, max: 5 }) + ',';
      // wouldrecommend
      review += Faker.random.boolean() + ',';
      // tags
      let tags = '';
      for (let j = 0; j < 2; j++) {
        if (Math.random() > 0.8) {
          if (tags[0]) {
            tags += ',';
          }
          tags += Seed10m.getRandomFoodWord();
          if (Math.random() > 0.9) {
            tags += `,${Seed10m.getRandomTagWord()}`;
          }
        }
      }
      review += tags + '\n';
      // Write to CSV
      let ok = reviews200mStream.write(review);
      if (!ok) {
        await new Promise((resolve, reject) => {
          reviews200mStream.once('drain', resolve);
        });
      };
    }
    reviews200mStream.end();
    reviews200mStream.on('finish', () => {
      console.log('Successfully appended 30m entries to reviews50m_4.csv. Total 200m.'); // CHECK THIS WHEN RERUNNING SCRIPT
    });
    reviews200mStream.on('error', () => {
      console.error('Error: write failed.');
    });
  },

};

// Seed10m.createRestaurants();
// Seed10m.createDiners();
Seed10m.createReviews(); // CHECK THIS WHEN RERUNNING SCRIPT
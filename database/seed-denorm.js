const fs = require('fs');
const Faker = require('faker');
const moment = require('moment');

const Seed = {
  foodWords: ['pot roast', 'chicken', 'sushi', 'marshmallows', 'pumpkin pie', 'wine'],
  tagWords: ['groups', 'kids', 'gluten free', 'vegan'],
  noiseLevels: ['Quiet', 'Average', 'Loud'],
  colors: ['#d86441', '#bb6acd', '#6c8ae4', '#df4e96'],
  getRandomFoodWord() {
    return Seed.foodWords[Math.floor(Math.random() * Seed.foodWords.length)];
  },
  getRandomTagWord() {
    return Seed.tagWords[Math.floor(Math.random() * Seed.tagWords.length)];
  },
  getRandomNoiseLevel() {
    return Seed.noiseLevels[Math.floor(Math.random() * Seed.noiseLevels.length)];
  },
  getRandomColor() {
    return Seed.colors[Math.floor(Math.random() * Seed.colors.length)];
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
  async createReviews() {
    // create 100 million reviews and store them in a CSV
    // 10 reviews per restaurant
    let reviewStream = fs.createWriteStream('../../sdc-data/reviews_denorm_1.csv', { flags: 'a' }); // CHECK THIS WHEN RERUNNING SCRIPT
    for (let restaurant_id = 1; restaurant_id <= 1000; restaurant_id += 1) { // CHECK THIS WHEN RERUNNING SCRIPT
      for (let j = 0; j < 20; j += 1) {
        let review = '';
        // id
        review += restaurant_id + '|';
        // text
        review += Faker.lorem.sentences();
        if (Math.random() > 0.7) {
          review.text += ` ${Faker.lorem.sentences()}`;
        }
        review += '|';
        // date
        review += moment(Faker.date.recent(365)).format('YYYY-MM-DD') + '|';
        // overall
        review += Faker.random.number({ min: 1, max: 5 }) + '|';
        // food
        review += Faker.random.number({ min: 1, max: 5 }) + '|';
        // service
        review += Faker.random.number({ min: 1, max: 5 }) + '|';
        // ambience
        review += Faker.random.number({ min: 1, max: 5 }) + '|';
        // wouldrecommend
        review += Faker.random.boolean() + '|';
        // tags
        let tags = '';
        for (let j = 0; j < 2; j++) {
          if (Math.random() > 0.8) {
            if (tags[0]) {
              tags += ',';
            }
            tags += Seed.getRandomFoodWord();
            if (Math.random() > 0.9) {
              tags += `,${Seed.getRandomTagWord()}`;
            }
          }
        }
        review += tags + '|';

        // Restaurant
        // name
        review += Faker.lorem.word() + '|';
        // location
        review += Faker.address.city().replace(/'/g, '') + '|';
        // noise
        review += Seed.getRandomNoiseLevel() + '|';
        // recommendpercent
        review += Faker.random.number({ min: 0, max: 100 }) + '|';
        // averageoverall
        review += Seed.fixFloatPrecision(Faker.random.number({ min: 0, max: 5, precision: 0.1 })) + '|';
        // averageservice
        review += Seed.fixFloatPrecision(Faker.random.number({ min: 0, max: 5, precision: 0.1 })) + '|';
        // averageambience
        review += Seed.fixFloatPrecision(Faker.random.number({ min: 0, max: 5, precision: 0.1 })) + '|';
        // averagefood
        review += Seed.fixFloatPrecision(Faker.random.number({ min: 0, max: 5, precision: 0.1 })) + '|';
        // valuerating
        review += Seed.fixFloatPrecision(Faker.random.number({ min: 0, max: 5, precision: 0.1 })) + '|';
        
        // Diner
        // firstname
        review += Faker.name.firstName().replace(/'/g, '') + '|';
        // lastname
        review += Faker.name.lastName().replace(/'/g, '') + '|';
        // city
        review += Faker.address.city().replace(/'/g, '') + '|';
        // avatarcolor
        review += Seed.getRandomColor() + '|';
        // isvip
        review += Seed.lowProbabilityRandom() + '|';
        // totalreviews
        review += Faker.random.number({ min: 0, max: 25 }) + '\n';

        // Write to CSV
        let ok = reviewStream.write(review);
        if (!ok) {
          await new Promise((resolve, reject) => {
            reviewStream.once('drain', resolve);
          });
        };
      }
    }
    reviewStream.end();
    reviewStream.on('finish', () => {
      console.log('Successfully appended 10m entries to reviews10m_20.csv. Total 200m.'); // CHECK THIS WHEN RERUNNING SCRIPT
    });
    reviewStream.on('error', () => {
      console.error('Error: write failed.');
    });
  },

};

Seed.createReviews(); // CHECK THIS WHEN RERUNNING SCRIPT
const fs = require('fs');
const Faker = require('faker');
const moment = require('moment');

// Document looks like:

// const foodWords = ['pot roast', 'chicken', 'sushi', 'marshmallows', 'pumpkin pie', 'wine'];
const foodWords = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'];

// const tagWords = ['groups', 'kids', 'gluten free', 'vegan'];
const tagWords = ['t1', 't2', 't3', 't4'];

// const noiseLevels = ['Quiet', 'Average', 'Loud'];
const noiseLevels = [1, 2, 3];

// const colors = ['#d86441', '#bb6acd', '#6c8ae4', '#df4e96'];
const colors = [1, 2, 3, 4];

function getRandomFoodWord() {
  return foodWords[Math.floor(Math.random() * foodWords.length)];
}

function getRandomTagWord() {
  return tagWords[Math.floor(Math.random() * tagWords.length)];
}

function getRandomNoiseLevel() {
  return noiseLevels[Math.floor(Math.random() * noiseLevels.length)];
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function lowProbabilityRandom() {
  if (Math.random() > 0.8) {
    return 't';
  }
  return 'f';
}

function regularRandom() {
  if (Math.random() > 0.5) {
    return 't';
  }
  return 'f';
}

function fixFloatPrecision(float) {
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
}

async function createReviews() {
  // create 10 million restaurants and store them in a JSONL
  // each restaurant has one review.
  let reviewStream = fs.createWriteStream('../../sdc-data/reviews_10m.jsonl', { flags: 'a' }); // CHECK THIS WHEN RERUNNING SCRIPT

  for (let restaurant_id = 1; restaurant_id <= 10000000; restaurant_id += 1) { // CHECK THIS WHEN RERUNNING SCRIPT

    for (let j = 0; j < 1; j += 1) { // CHECK THIS WHEN RERUNNING SCRIPT

      text = Faker.lorem.sentences();
      if (Math.random() > 0.7) {
        text += ` ${Faker.lorem.sentences()}`;
      }

      tags = '';
      for (let k = 0; k < 2; k++) {
        if (Math.random() > 0.8) {
          if (tags[0]) {
            tags += ',';
          }
          tags += getRandomFoodWord();
          if (Math.random() > 0.9) {
            tags += `,${getRandomTagWord()}`;
          }
        }
      }

      const review = {
        // restaurant_id
        "z": restaurant_id,
        // text
        "t": text,
        // date
        // "d": moment(Faker.date.recent(365)).format('YYYY-MM-DD'),
        "d": moment(Faker.date.recent(365)).format('YYMMD'),
        // overall
        "o": Faker.random.number({ min: 1, max: 5 }),
        // food
        "f": Faker.random.number({ min: 1, max: 5 }),
        // service
        "s": Faker.random.number({ min: 1, max: 5 }),
        // ambience
        "a": Faker.random.number({ min: 1, max: 5 }),
        // wouldrecommend
        "w": regularRandom(),
        // tags
        "g": tags,
        // restaurant location
        "rl": Faker.address.city().replace(/'/g, ''),
        // restaurant noise
        "ri": getRandomNoiseLevel(),
        // restaurant recommend
        "rr": Faker.random.number({ min: 0, max: 100 }),
        // restaurant overall
        "ro": fixFloatPrecision(Faker.random.number({ min: 0, max: 5, precision: 0.1 })),
        // restaurant average service
        "rs": fixFloatPrecision(Faker.random.number({ min: 0, max: 5, precision: 0.1 })),
        // restaurant average ambience
        "ra": fixFloatPrecision(Faker.random.number({ min: 0, max: 5, precision: 0.1 })),
        // restaurant average foood
        "rf": fixFloatPrecision(Faker.random.number({ min: 0, max: 5, precision: 0.1 })),
        // restaurant average value
        "rv": fixFloatPrecision(Faker.random.number({ min: 0, max: 5, precision: 0.1 })),
        // diner first name
        "df": Faker.name.firstName().replace(/'/g, ''),
        // diner last name
        "dl": Faker.name.lastName().replace(/'/g, ''),
        // diner city
        "dc": Faker.address.city().replace(/'/g, ''),
        // diner avatar color
        "da": getRandomColor(),
        // diner isvip
        "dv": lowProbabilityRandom(),
        // diner total reviews
        "dt": Faker.random.number({ min: 0, max: 25 }),
      };

      let reviewOK = reviewStream.write(JSON.stringify(review) + '\n');
      if (!reviewOK) {
        await new Promise((resolve) => {
          reviewStream.once('drain', resolve);
        });
      };

    }
  }

  reviewStream.end();
  reviewStream.on('finish', () => {
    console.log('Successfully appended 10m entries to reviews_10m.jsonl. Total 10m.'); // CHECK THIS WHEN RERUNNING SCRIPT
  });
  reviewStream.on('error', () => {
    console.error('Error: write failed.');
  });
};

createReviews();
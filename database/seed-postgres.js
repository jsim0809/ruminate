const fs = require('fs');
const Faker = require('faker');
const moment = require('moment');

// Key/Value Revamp

// const foodWords = ['pot roast', 'chicken', 'sushi', 'marshmallows', 'pumpkin pie', 'wine'];
const foodWords = ['0', '1', '2', '3', '4', '5'];
// const tagWords = ['groups', 'kids', 'gluten free', 'vegan'];
const tagWords = ['6', '7', '8', '9'];
// const noiseLevels = ['Quiet', 'Average', 'Loud'];
// const colors = ['#d86441', '#bb6acd', '#6c8ae4', '#df4e96'];

function getRandomFoodWord() {
  return foodWords[Math.floor(Math.random() * foodWords.length)];
}
function getRandomTagWord() {
  return tagWords[Math.floor(Math.random() * tagWords.length)];
}
function lowProbabilityRandom() {
  if (Math.random() > 0.8) {
    return '1';
  }
  return '0';
}
function regularRandom() {
  if (Math.random() > 0.5) {
    return '1';
  }
  return '0';
}
function padNumber(num) {
  if (num < 10) {
    return '0' + num;
  }
  return '' + num;
}

async function createReviews() {
  // create 10 million restaurants and store them in a JSONL
  // each restaurant has one summary document and n reviews.
  let reviewStream = fs.createWriteStream('../../sdc-data/reviews_10m_zip.csv', { flags: 'a' }); // CHECK THIS WHEN RERUNNING SCRIPT

  for (let restaurant_id = 1; restaurant_id <= 10000000; restaurant_id += 1) { // CHECK THIS WHEN RERUNNING SCRIPT
    for (let j = 1; j <= 1; j += 1) { // CHECK THIS WHEN RERUNNING SCRIPT
      let review = '';

      review += Number(restaurant_id).toString(36) + ','; // base 36 string representing restaurant id
      // restaurant location
      review += Faker.address.city().replace(/'/g, '') + ','; // location
      // metrics: 12-14 digit number converted to base 36. Overall(2), Food(2), Service(2), Ambience(2), Value(2), Noise(1), Recommend% (1-3)
      review += Number(padNumber(Faker.random.number({ min: 0, max: 50 })) + padNumber(Faker.random.number({ min: 0, max: 50 }))
        + padNumber(Faker.random.number({ min: 0, max: 50 })) + padNumber(Faker.random.number({ min: 0, max: 50 }))
        + padNumber(Faker.random.number({ min: 0, max: 50 })) + Faker.random.number({ min: 0, max: 2 })
        + Faker.random.number({ min: 0, max: 100 })).toString(36) + ',';

      text = Faker.lorem.sentences();
      if (Math.random() > 0.7) {
        text += ` ${Faker.lorem.sentences()}`;
      }
      tags = '';
      for (let k = 0; k < 2; k++) {
        if (Math.random() > 0.8) {
          tags += getRandomFoodWord();
          if (Math.random() > 0.9) {
            tags += getRandomTagWord();
          }
        }
      }

      review += text + ',';
      review += moment(Faker.date.recent(365)).diff(moment([2019, 1, 1]), 'days') + ','; // days since Jan 1 2019
      // metrics: 8-9 digit number converted to base 36. Overall(1), Food(1), Service(1), Ambience(1), Wouldrecommend(1)
      // avatar(1), isVip(1), totalreviews(1-2)
      review += Number(Faker.random.number({ min: 1, max: 5 }) + Faker.random.number({ min: 1, max: 5 }) + Faker.random.number({ min: 1, max: 5 })
        + Faker.random.number({ min: 1, max: 5 }) + regularRandom() + Faker.random.number({ min: 0, max: 3 }) + lowProbabilityRandom()
        + Faker.random.number({ min: 0, max: 25 })).toString(36) + ',';
      review += Faker.name.firstName().replace(/'/g, '') + ',';
      review += Faker.name.lastName().replace(/'/g, '') + ',';
      review += Faker.address.city().replace(/'/g, '') + ',';
      review += tags + '\n'; // Tags are digits, not separated

      let ok = reviewStream.write(review);
      if (!ok) {
        await new Promise((resolve) => {
          reviewStream.once('drain', resolve);
        });
      };

    }
  }

  reviewStream.end();
  reviewStream.on('finish', () => {
    console.log('Successfully appended 10m entries to reviews_10m_zip.csv.'); // CHECK THIS WHEN RERUNNING SCRIPT
  });
  reviewStream.on('error', () => {
    console.error('Error: write failed.');
  });
};

createReviews();
// Document looks like:

const foodWords = ['pot roast', 'chicken', 'sushi', 'marshmallows', 'pumpkin pie', 'wine'];
const tagWords = ['groups', 'kids', 'gluten free', 'vegan'];
const noiseLevels = ['Quiet', 'Average', 'Loud'];
const colors = ['#d86441', '#bb6acd', '#6c8ae4', '#df4e96'];

function getRandomFoodWord() {
  return Seed.foodWords[Math.floor(Math.random() * Seed.foodWords.length)];
  }

function getRandomTagWord() {
    return Seed.tagWords[Math.floor(Math.random() * Seed.tagWords.length)];
  }

function getRandomNoiseLevel() {
    return Seed.noiseLevels[Math.floor(Math.random() * Seed.noiseLevels.length)];
  }

function getRandomColor() {
    return Seed.colors[Math.floor(Math.random() * Seed.colors.length)];
}

function lowProbabilityRandom() {
    return Math.random() > 0.8;
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


text = Faker.lorem.sentences();
if (Math.random() > 0.7) {
  text += ` ${Faker.lorem.sentences()}`;
}
date = moment(Faker.date.recent(365)).format('YYYY-MM-DD');
overall = Faker.random.number({ min: 1, max: 5 });
food = Faker.random.number({ min: 1, max: 5 });
service = Faker.random.number({ min: 1, max: 5 });
ambience = Faker.random.number({ min: 1, max: 5 });
wouldrecommend = Faker.random.boolean();
tags = '';
for (let j = 0; j < 2; j++) {
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

restaurant_name = Faker.lorem.word() + '|';
restaurant_location = Faker.address.city().replace(/'/g, '') + '|';
restaurant_noise = Seed.getRandomNoiseLevel() + '|';
restaurant_recommendpercent = Faker.random.number({ min: 0, max: 100 }) + '|';
restaurant_averageoverall = Seed.fixFloatPrecision(Faker.random.number({ min: 0, max: 5, precision: 0.1 })) + '|';
restaurant_averageservice = Seed.fixFloatPrecision(Faker.random.number({ min: 0, max: 5, precision: 0.1 })) + '|';
restaurant_averageambience = Seed.fixFloatPrecision(Faker.random.number({ min: 0, max: 5, precision: 0.1 })) + '|';
restaurant_averagefood = Seed.fixFloatPrecision(Faker.random.number({ min: 0, max: 5, precision: 0.1 })) + '|';
restaurant_valuerating = Seed.fixFloatPrecision(Faker.random.number({ min: 0, max: 5, precision: 0.1 })) + '|';

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



{

  "restaurant_id": i,
  "text":
  "date":
  "overall":
  "food":
  "service":
  "ambience":
  "wouldrecommend":
  "tags":
  "restaurant_name":
  "restaurant_location":
  "restaurant_noise":
  "restaurant_recommendpercent
  "restaurant_averageoverall":
  "restaurant_averageservice":
  "restaurant_averageambience":
  "restaurant_averagefood":
  "restaurant_valuerating":
  "diner_firstname":
  "diner_lastname":
  "diner_city":
  "diner_avatarcolor":
  "diner_isvip":
  "diner_totalreviews":

}

const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: 'Coconut Jollof Rice',
      level: 'Amateur Chef',
      ingredients: ['rice', 'tomatoes', 'onions', 'peppers', 'salt', 'oil', 'coconut'],
      cuisine: 'african',
      dishType: 'main_course',
      image: '/images/Coconut-Jollof-rice.jpg',
      duration: 60,
      creator: 'Diana Odiaka',
      created: new Date(2020, 06, 22)
    });
  })
  .then(recipes => {
    return Recipe.insertMany(data);
  })
  .then(recipes => {
    console.log('Many recipes inserted', data);
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 },
      { new: true }
    );
  })
  .then(data => {
    console.log('succesfully updated duration', data);
    return Recipe.deleteOne({ title: 'Carrot Cake' }, { new: true });
  })
  .then(data => {
    console.log('Carrot cake was succefully deleted', data);
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

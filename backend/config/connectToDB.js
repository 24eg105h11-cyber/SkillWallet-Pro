const mongoose = require('mongoose');

const connectToDB = () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error('Could not connect to MongoDB: MONGO_URI is not defined. Check your .env file.');
  }

  mongoose
    .connect(uri)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      throw new Error(`Could not connect to MongoDB: ${err}`);
    });
};

module.exports = connectToDB;

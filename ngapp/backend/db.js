
const mongoose = require('mongoose');

async function connectDB() {
  try {
    const mongoUri =
      process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tp3db';

    await mongoose.connect(mongoUri);
    console.log('MongoDB connecté avec succès');
  } catch (error) {
    console.error('Erreur de connexion MongoDB :', error.message);
    process.exit(1);
  }
}

module.exports = connectDB;

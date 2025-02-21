const mongoose = require('mongoose');
const Availability = require('../models/availability');

async function fetchAvailabilities() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/book_a_doc_db');

    const availabilities = await Availability.find({});
    // eslint-disable-next-line no-console
    console.log('Availabilities:', availabilities);

    await mongoose.connection.close();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching availabilities:', error);
  }
}

fetchAvailabilities();

const mongoose = require('mongoose');
const Doctor = require('../models/doctor');

async function fetchDoctors() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/book_a_doc_db');

    const doctors = await Doctor.find({})
      .populate('specialtyId', 'specialtyName');
    // eslint-disable-next-line no-console
    console.log('Doctors:', doctors);

    await mongoose.connection.close();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching doctors:', error);
  }
}

fetchDoctors();

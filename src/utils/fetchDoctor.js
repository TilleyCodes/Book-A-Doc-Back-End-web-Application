const mongoose = require('mongoose');
const Doctor = require('../models/doctor');

async function fetchDoctors() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/book_a_doc_db');

    const doctors = await Doctor.find({})
      .populate('specialtyId', 'specialtyName');
    console.log('Doctors:', doctors);

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error fetching doctors:', error);
  }
}

fetchDoctors();

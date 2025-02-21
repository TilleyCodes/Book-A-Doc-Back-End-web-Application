const mongoose = require('mongoose');
const DoctorAvailability = require('../models/doctorAvailability');
require('../models/doctor');
require('../models/availability');

async function fetchDoctorAvailabilities() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/book_a_doc_db');

    const doctorAvailabilities = await DoctorAvailability.find({})
      .populate('doctorId', 'doctorName')
      .populate('availabilityId', 'date startTime endTime isBooked');
    // eslint-disable-next-line no-console
    console.log('Current Doctor Availabilities:', doctorAvailabilities);

    await mongoose.connection.close();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching bookings:', error);
  }
}

fetchDoctorAvailabilities();

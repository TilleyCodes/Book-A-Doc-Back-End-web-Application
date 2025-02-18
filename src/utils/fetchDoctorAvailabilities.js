const mongoose = require('mongoose')
const { DoctorAvailabilitiesModel } = require('../models/doctorAvailabilitiesModel')

async function fetchDoctorAvailabilities() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/book_a_doc_db')

        const doctorAvailabilities = await DoctorAvailabilitiesModel.find({})
            .populate('availability_id', 'date start_time end_time is_booked')
        console.log('Current Doctor Availabilities:', doctorAvailabilities)

        await mongoose.connection.close()
    } catch (error) {
        console.error('Error fetching bookings:', error)
    }
}

fetchDoctorAvailabilities()
const mongoose = require('mongoose')
const { BookingsModel } = require('../models/bookingsModel')

async function fetchBookings() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/book_a_doc_db')

        const bookings = await BookingsModel.find({})
            .populate('patient_id', 'fname lname')
            .populate('availability_id', 'date start_time end_time is_booked')
        console.log('Current Bookings:', bookings)

        await mongoose.connection.close()
    } catch (error) {
        console.error('Error fetching bookings:', error)
    }
}

fetchBookings()
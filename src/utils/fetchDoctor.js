const mongoose = require('mongoose')
const { DoctorModel } = require('../models/doctorModel')

async function fetchDoctors() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/book_a_doc_db')

        const doctors = await DoctorModel.find({})
        console.log('Doctors:', doctors)

        await mongoose.connection.close()
    } catch (error) {
        console.error('Error fetching doctors:', error)
    }
}

fetchDoctors()
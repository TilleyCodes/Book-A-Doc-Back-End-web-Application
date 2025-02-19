const mongoose = require('mongoose')
const { DoctorCentreModel } = require('../models/doctorCentreModel')

async function fetchDoctorCentres() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/book_a_doc_db')

        const doctorCentres = await DoctorCentreModel.find({})
        console.log('DoctorCentres:', doctorCentres)

        await mongoose.connection.close()
    } catch (error) {
        console.error('Error fetching doctorCentres:', error)
    }
}

fetchDoctorCentres()
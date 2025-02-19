const mongoose = require('mongoose')
const Patient = require('../models/patient')

async function fetchPatients() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/book_a_doc_db')

        const patients = await Patient.find({})
        console.log('Patients:', patients)

        await mongoose.connection.close()
    } catch (error) {
        console.error('Error fetching patients:', error)
    }
}

fetchPatients()
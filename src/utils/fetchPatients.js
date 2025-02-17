const mongoose = require('mongoose')
const { PatientsModel } = require('../models/patientsModel')

async function fetchPatients() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/book_a_doc_db')

        const patients = await PatientsModel.find({})
        console.log('Patients:', patients)

        await mongoose.connection.close()
    } catch (error) {
        console.error('Error fetching patients:', error)
    }
}

fetchPatients()
const mongoose = require('mongoose')
const { MedicalCentresModel } = require('../models/medicalCentresModel')

async function fetchMedicalCentres() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/book_a_doc_db')

        const medicalCentres = await MedicalCentresModel.find({})
        console.log('MedicalCentres:', medicalCentres)

        await mongoose.connection.close()
    } catch (error) {
        console.error('Error fetching medicalCentres:', error)
    }
}

fetchMedicalCentres()
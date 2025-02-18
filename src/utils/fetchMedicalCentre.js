const mongoose = require('mongoose')
const { MedicalCentreModel } = require('../models/medicalCentreModel')

async function fetchMedicalCentres() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/book_a_doc_db')

        const medicalCentres = await MedicalCentreModel.find({})
        console.log('MedicalCentres:', medicalCentres)

        await mongoose.connection.close()
    } catch (error) {
        console.error('Error fetching medicalCentres:', error)
    }
}

fetchMedicalCentres()
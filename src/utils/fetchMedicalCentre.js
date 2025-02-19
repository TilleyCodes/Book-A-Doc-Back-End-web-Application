const mongoose = require('mongoose')
const MedicalCentre = require('../models/medicalCentre')

async function fetchMedicalCentres() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/book_a_doc_db')

        const medicalCentres = await MedicalCentre.find({})
        console.log('MedicalCentres:', medicalCentres)

        await mongoose.connection.close()
    } catch (error) {
        console.error('Error fetching medicalCentres:', error)
    }
}

fetchMedicalCentres()
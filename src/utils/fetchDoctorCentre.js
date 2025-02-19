const mongoose = require('mongoose')
const DoctorCentre = require('../models/doctorCentre')

async function fetchDoctorCentres() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/book_a_doc_db')

        const doctorCentres = await DoctorCentre.find({})
            .populate('doctorId', 'doctorName')
            .populate('medicalCentreId', 'medicalCentreName')
        console.log('Doctor Centres:', doctorCentres)

        await mongoose.connection.close()
    } catch (error) {
        console.error('Error fetching Doctor Centres:', error)
    }
}

fetchDoctorCentres()
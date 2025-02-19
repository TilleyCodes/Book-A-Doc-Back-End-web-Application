const mongoose = require('mongoose')
const Specialty = require('../models/specialty')

async function fetchSpecialties() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/book_a_doc_db')

        const specialties = await Specialty.find({})
        console.log('Specialties:', specialties)

        await mongoose.connection.close()
    } catch (error) {
        console.error('Error fetching specialties:', error)
    }
}

fetchSpecialties()
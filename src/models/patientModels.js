const mongoose = require('mongoose')

// Schema with data properties
const PatientsSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: {
        type: String,
        unique: true // Handle errors in routes
    },
    date_of_birth: Date,
    address: String,
    phone_number: String,
    password: String, // Handle validation in front-end
})

// Model that uses schema
const PatientsModel = mongoose.model('Patients', PatientsSchema)

// Export model
module.exports = { PatientsModel }
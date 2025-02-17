const mongoose = require('mongoose')

// Schema with data properties
const PatientsSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    date_of_birth: Date,
    address: String,
    phone_number: String,
    password: String,
})

// Model that uses schema
const PatientsModel = mongoose.model('Patients', PatientsSchema)

// Export model
module.exports = {PatientsModel}
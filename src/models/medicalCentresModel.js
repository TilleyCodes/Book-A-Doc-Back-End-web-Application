const mongoose = require('mongoose')

// Schema with data properties
const MedicalCentresSchema = new mongoose.Schema({
    medical_centre_name: String,
    operating_hours: String,
    address: String,
    contacts: {
		email: String, // update make unique and cannot be duplicate
		phone: String
	},
})

// Model that uses schema
const MedicalCentresModel = mongoose.model('MedicalCentres', MedicalCentresSchema)

// Export model
module.exports = {MedicalCentresModel}
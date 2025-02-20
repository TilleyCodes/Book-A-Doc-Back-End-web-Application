const mongoose = require('mongoose')

// Schema with data properties
const availabilitySchema = new mongoose.Schema({
    date: Date,
    startTime: String,
    endTime: String,
    isBooked: Boolean,
})

// Model that uses schema
const Availability = mongoose.model('Availability', availabilitySchema)

// Export model
module.exports = Availability;
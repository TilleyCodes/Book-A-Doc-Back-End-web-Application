const mongoose = require('mongoose')

// Schema with data properties
const patientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is reqiured']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: {
            validator: function(value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Please enter a valid email address'
        },
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of birth is required'],
        validate: [
            {
                validator: function(value) {
                    return value <= new Date();
                },
                message: 'Date of birth cannot be in the future'
            },
            {
                validator: function(value) {
                    const today = new Date();
                    const age = today.getFullYear() - value.getFullYear();
                    const monthDifference = today.getMonth() - value.getMonth();
                    // minus 1 year if current date is before birthday
                    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < value.getDate())) {
                        return age -1 >= 18;
                    }
                    return age >= 18;
                },
                message: 'Patient must be at least 18 years old'
            }
        ]
    },
    address: {
        street: {
            type: String,
            required: [true, 'Street address is required']
        },
        city: {
            type: String,
            required: [true, 'City is required']
        }
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [10, 'Password must be at least 10 characters long']
    } 
})

patientSchema.index({ email: 1 });
patientSchema.index({ 'firstName': 1, 'lastName': 1 });

// Model that uses schema
const Patient = mongoose.model('Patient', patientSchema)

// Export model
module.exports = { Patient }
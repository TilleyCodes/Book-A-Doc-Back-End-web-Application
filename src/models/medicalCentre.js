const mongoose = require('mongoose')

// Schema with data properties
const medicalCentreSchema = new mongoose.Schema({
    medicalCentreName: {
        type: String,
        required: [true, 'Medical centre name is required']
    },
    operatingHours: {
        type: String,
         required: [true, 'Operating hours are required']
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
    contacts: {
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
        phone: {
            type: String,
            required: [true, 'Phone number is required']
        }
    }
});

// Model that uses schema
const MedicalCentre = mongoose.model('MedicalCentre', medicalCentreSchema)

// Export model
module.exports = MedicalCentre;
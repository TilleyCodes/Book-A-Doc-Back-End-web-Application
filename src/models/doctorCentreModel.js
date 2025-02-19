const mongoose = require('mongoose')

const doctorCentreSchema = new mongoose.Schema({
    doctor_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'doctor'
    },
    medical_centre_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'medical_centre'
    }
});

const DoctorCentreModel = mongoose.model('DoctorCentre', doctorCentreSchema);

module.exports = { DoctorCentreModel };
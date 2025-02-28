const mongoose = require('mongoose');

const doctorCentreSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Doctor',
    required: [true, 'Doctor ID is required'],
  },
  medicalCentreId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'MedicalCentre',
    required: [true, 'Medical Centre ID is required'],
  },
});

const DoctorCentre = mongoose.model('DoctorCentre', doctorCentreSchema);

module.exports = DoctorCentre;

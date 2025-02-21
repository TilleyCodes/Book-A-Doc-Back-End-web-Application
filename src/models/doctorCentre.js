const mongoose = require('mongoose');

const doctorCentreSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Doctor',
  },
  medicalCentreId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'MedicalCentre',
  },
});

const DoctorCentre = mongoose.model('DoctorCentre', doctorCentreSchema);

module.exports = DoctorCentre;

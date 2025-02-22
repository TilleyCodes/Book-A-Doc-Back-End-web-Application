/* eslint-disable no-underscore-dangle */
// app file for testing purposes only
const express = require('express');
const Patient = require('./models/patient');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

// Routes for patients testing
app.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/patients/:patientId', async (req, res) => {
  try {
    const { patientId } = req.params;
    const patients = await Patient.find();
    // eslint-disable-next-line no-underscore-dangle
    const patient = patients.find((p) => p._id === patientId);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json([patient]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/patients', errorHandler(async (req, res) => {
  const newPatient = await Patient.create();
  res.status(200).json(newPatient);
}));

app.patch('/patients/:patientId', errorHandler(async (req, res) => {
  const { patientId } = req.params;
  const updatedPatient = await Patient.findByIdAndUpdate(
    patientId,
    req.body,
    { new: true, runValidators: true },
  );
  if (!updatedPatient) {
    return res.status(404).json({ error: `Patient with id: ${patientId} does not exist.` });
  }
  res.status(200).json(updatedPatient);
}));

module.exports = app;

// app file for testing purposes only
const express = require('express');
const Patient = require('./models/patient');

const app = express();

app.use(express.json());

// Routes for patients testing
app.get('/patients', async (request, response) => {
  try {
    const patients = await Patient.find();
    response.status(200).json(patients);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

app.get('/patients/:patientId', async (request, response) => {
  try {
    const { patientId } = request.params;
    const patients = await Patient.find();
    // eslint-disable-next-line no-underscore-dangle
    const patient = patients.find((p) => p._id === patientId);

    if (!patient) {
      return response.status(404).json({ message: 'Patient not found' });
    }

    response.status(200).json([patient]);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

module.exports = app;

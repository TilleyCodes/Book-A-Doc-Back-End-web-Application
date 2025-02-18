// app file for testing purposes only
const express = require('express');
const { PatientsModel } = require('./models/patientModels');
const app = express();

// Set up middleware, routes, etc.
app.use(express.json());

// Example route for patients
app.get('/patients', async (request, response) => {
  try {
    const patients = await PatientsModel.find();
    response.status(200).json(patients);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

module.exports = app;

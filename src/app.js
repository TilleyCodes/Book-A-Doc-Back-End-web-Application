// app file for testing purposes only
const express = require('express')
const { PatientsModel } = require('./models/patientModels')
const app = express()

app.use(express.json())

// Routes for patients testing
app.get('/patients', async (request, response) => {
  try {
    const patients = await PatientsModel.find()
    response.status(200).json(patients)
  } catch (error) {
    response.status(500).json({ message: error.message })
  }
})

app.get('/patients/:patientId', async (request, response) => {
  try {
    const patientId = request.params.patientId
    const patients = await PatientsModel.find()
    const patient = patients.find((p) => p._id === patientId)
    
    if (!patient) {
      return response.status(404).json({ message: 'Patient not found'})
    }

    response.status(200).json([patient])

  } catch (error) {
    response.status(500).json({ message: error.message })
  }
})

module.exports = app;

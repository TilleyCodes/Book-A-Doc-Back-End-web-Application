const { PatientsModel } = require("../models/patientModels");

// GET ALL data from PatientsModel db
async function getPatients() {
    const patients = await PatientsModel.find()
    return patients
}

// GET ONE data from PatientsModel db


// CREATE data from PatientsModel db


// UPDATE data from PatientsModel db


// DELETE data from PatientsModel db


module.exports = {
    getPatients,
}
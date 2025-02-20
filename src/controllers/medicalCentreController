const MedicalCentre = require('../models/medicalCentre');

// Get all medical centres
const getMedicalCentres = async () => {
    try {
        return await MedicalCentre.find({});
    } catch (error) {
        console.error('Error getting medical centres:', error.message);
        throw error;
    }
};

// Get single medical centre
const getMedicalCentre = async (id) => {
    try {
        return await MedicalCentre.findById(id);
    } catch (error) {
        console.error('Error getting medical centre:', error.message);
        throw error;
    }
};

// Create new medical centre
const createMedicalCentre = async (data) => {
    try {
        const medicalCentre = new MedicalCentre(data);
        return await medicalCentre.save();
    } catch (error) {
        console.error('Error creating medical centre:', error.message);
        throw error;
    }
};

// Update medical centre
const updateMedicalCentre = async (id, data) => {
    try {
        return await MedicalCentre.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );
    } catch (error) {
        console.error('Error updating medical centre:', error.message);
        throw error;
    }
};

// Delete medical centre
const deleteMedicalCentre = async (id) => {
    try {
        return await MedicalCentre.findByIdAndDelete(id);
    } catch (error) {
        console.error('Error deleting medical centre:', error.message);
        throw error;
    }
};

module.exports = {
    getMedicalCentres,
    getMedicalCentre,
    createMedicalCentre,
    updateMedicalCentre,
    deleteMedicalCentre
};
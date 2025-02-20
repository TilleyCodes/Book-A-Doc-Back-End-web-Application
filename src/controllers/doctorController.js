const Doctor = require('../models/doctor');

// Get all doctor
const getDoctors = async () => {
    try {
        return await Doctor.find({});
    } catch (error) {
        console.error('Error getting doctors:', error.message);
        throw error;
    }
};

// Get single doctor
const getDoctor = async (id) => {
    try {
        return await Doctor.findById(id);
    } catch (error) {
        console.error('Error getting doctor:', error.message);
        throw error;
    }
};

// Create new doctor
const createDoctor = async (data) => {
    try {
        const doctor = new Doctor(data);
        return await doctor.save();
    } catch (error) {
        console.error('Error creating doctor:', error.message);
        throw error;
    }
};

// Update doctor
const updateDoctor = async (id, data) => {
    try {
        return await Doctor.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );
    } catch (error) {
        console.error('Error updating doctor:', error.message);
        throw error;
    }
};

// Delete doctor
const deleteDoctor = async (id) => {
    try {
        return await Doctor.findByIdAndDelete(id);
    } catch (error) {
        console.error('Error deleting doctor:', error.message);
        throw error;
    }
};

module.exports = {
    getDoctors,
    getDoctor,
    createDoctor,
    updateDoctor,
    deleteDoctor
};
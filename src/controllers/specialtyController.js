const Specialty = require('../models/specialty');

// Get all specialty
const getSpecialties = async () => {
    try {
        return await Specialty.find({});
    } catch (error) {
        console.error('Error getting specialties:', error.message);
        throw error;
    }
};

// Get single specialty
const getSpecialty = async (id) => {
    try {
        return await Specialty.findById(id);
    } catch (error) {
        console.error('Error getting specialty:', error.message);
        throw error;
    }
};

// Create new specialty
const createSpecialty = async (data) => {
    try {
        const specialty = new Specialty(data);
        return await specialty.save();
    } catch (error) {
        console.error('Error creating specialty:', error.message);
        throw error;
    }
};

// Update specialty
const updateSpecialty = async (id, data) => {
    try {
        return await Specialty.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );
    } catch (error) {
        console.error('Error updating specialty:', error.message);
        throw error;
    }
};

// Delete specialty
const deleteSpecialty = async (id) => {
    try {
        return await Specialty.findByIdAndDelete(id);
    } catch (error) {
        console.error('Error deleting specialty:', error.message);
        throw error;
    }
};

module.exports = {
    getSpecialties,
    getSpecialty,
    createSpecialty,
    updateSpecialty,
    deleteSpecialty
};
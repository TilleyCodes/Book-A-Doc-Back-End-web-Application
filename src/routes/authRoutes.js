const express = require('express');
const { errorHandler } = require('../middleware/errorHandler');
const Patient = require('../models/patient');

const router = express.Router();

// Login route
router.post('/login', errorHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Email and password are required',
    });
  }

  // Find patient by email
  const patient = await Patient.findOne({ email });

  if (!patient) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid credentials',
    });
  }

  // Compare password
  const isValidPassword = await patient.comparePassword(password);

  if (!isValidPassword) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid credentials',
    });
  }

  // Generate JWT token using the model's method
  const token = patient.generateAuthToken();

  return res.status(200).json({
    status: 'success',
    token,
  });
}));

module.exports = router;

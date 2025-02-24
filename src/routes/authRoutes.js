const express = require('express');
const jwt = require('jsonwebtoken');
const Patient = require('../models/patient');

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Debug log
    console.log('Login attempt:', { email });

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find patient by email
    const patient = await Patient.findOne({ email });
    
    // Debug log
    console.log('Found patient:', patient ? 'Yes' : 'No');
    console.log('Stored password hash:', patient?.password);

    if (!patient) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare password
    const isValidPassword = await patient.comparePassword(password);
    
    // Debug log
    console.log('Password comparison result:', isValidPassword);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token using the model's method
    const token = patient.generateAuthToken();

    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
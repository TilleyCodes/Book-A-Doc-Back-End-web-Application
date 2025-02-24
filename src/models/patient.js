const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const hashPassword = require('../middleware/hashPassword');

// Schema with data properties
const patientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is reqiured'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: {
      validator(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Please enter a valid email address',
    },
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required'],
    validate: [
      {
        validator(value) {
          return value <= new Date();
        },
        message: 'Date of birth cannot be in the future',
      },
      {
        validator(value) {
          const today = new Date();
          const age = today.getFullYear() - value.getFullYear();
          const monthDifference = today.getMonth() - value.getMonth();
          // minus 1 year if current date is before birthday
          if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < value.getDate())) {
            return age - 1 >= 18;
          }
          return age >= 18;
        },
        message: 'Patient must be at least 18 years old',
      },
    ],
  },
  address: {
    street: {
      type: String,
      required: [true, 'Street address is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [10, 'Password must be at least 10 characters long'],
  },
});

patientSchema.index({ firstName: 1, lastName: 1 });

// comparePassword method
patientSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

// hashPassword middleware
patientSchema.plugin(hashPassword, { saltRounds: 12 });

patientSchema.methods.generateAuthToken = function createToken () {
  // Create token payload
  const payload = { id: this._id, email: this.email };

  // Sign the token using a secret and options
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET || 'default_secret',
    { expiresIn: '1d' },
  );

  return token;
};

// Model that uses schema
const Patient = mongoose.model('Patient', patientSchema);

// Export model
module.exports = Patient;

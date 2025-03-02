// app file for testing purposes only
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { errorHandler, globalErrorHandler } = require('./middleware/errorHandler');

// Import models for testing routes
const Patient = require('./models/patient');
const MedicalCentre = require('./models/medicalCentre');
const Specialty = require('./models/specialty');

// Import all routers
const authRouter = require('./routes/authRoutes');
const patientRouter = require('./routes/patientRoutes');
const medicalCentreRouter = require('./routes/medicalCentreRoutes');
const specialtyRouter = require('./routes/specialtyRoutes');
const doctorRouter = require('./routes/doctorRoutes');
const doctorCentreRouter = require('./routes/doctorCentreRoutes');
const availabilityRouter = require('./routes/availabilityRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const doctorAvailabilityRouter = require('./routes/doctorAvailabilityRoutes');

const app = express();

// Security middleware
app.use(helmet());

// Middleware, allow JSON body data request
app.use(express.json());

// Configure CORS
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Book A Doc API!',
  });
});

// Router handlers
app.use('/auth', authRouter);
app.use('/patients', patientRouter);
app.use('/medicalCentres', medicalCentreRouter);
app.use('/specialties', specialtyRouter);
app.use('/doctors', doctorRouter);
app.use('/doctorCentres', doctorCentreRouter);
app.use('/availabilities', availabilityRouter);
app.use('/bookings', bookingRouter);
app.use('/doctorAvailabilities', doctorAvailabilityRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Page not found.',
    path: req.path,
  });
});

// Global Error Handler
app.use(globalErrorHandler);

module.exports = app;

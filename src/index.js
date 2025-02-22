/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const cors = require('cors');
const patientRouter = require('./routes/patientRoutes');
const medicalCentreRouter = require('./routes/medicalCentreRoutes');
const specialtyRouter = require('./routes/specialtyRoutes');
const doctorRouter = require('./routes/doctorRoutes');
const doctorCentreRouter = require('./routes/doctorCentreRoutes');
const availabilityRouter = require('./routes/availabilityRoute');
const bookingRouter = require('./routes/bookingRoute');
const doctorAvailabilityRouter = require('./routes/doctorAvailabilityRoute');

const app = express();

// Configure CORS
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173', 'https://deployedApp.com'],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

app.get('/', (req, res) => {
  console.log('User visited home page.');
  res.json({
    message: 'Hello world!',
  });
});

app.use('/patients', patientRouter);
app.use('/availability', availabilityRouter);
app.use('/bookings', bookingRouter);
app.use('/doctor_availability', doctorAvailabilityRouter);
app.use('/medicalCentres', medicalCentreRouter);
app.use('/specialties', specialtyRouter);
app.use('/doctors', doctorRouter);
app.use('/doctorCentres', doctorCentreRouter);

// ERROR HANDLING
app.get('*', (req, res) => {
  console.log(`User tried to visit ${req.path}`);
  res.status(404).json({
    message: 'Page not found. ',
    attemptedPath: req.path,
  });
});

// Error handling catcher
// applies to every route in the server by using .use
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);
  await mongoose.connect('mongodb://127.0.0.1:27017/book_a_doc_db');
  console.log('Database connected');
});

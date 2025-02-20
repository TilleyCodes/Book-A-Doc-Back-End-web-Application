/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const patientRouter = require('./routes/patientRoutes');
const medicalCentreRouter = require('./routes/medicalCentreRoutes');
const specialtyRouter = require('./routes/specialtyRoutes');
const doctorRouter = require('./routes/doctorRoutes');
const availabilityRouter = require('./routes/availabilityRoute');
const bookingRouter = require('./routes/bookingRoute');

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  console.log('User visited home page.');
  response.json({
    message: 'Hello world!',
  });
});

app.use('/patients', patientRouter);
app.use('/availability', availabilityRouter);
app.use('/bookings', bookingRouter);
app.use('/medicalCentres', medicalCentreRouter);
app.use('/specialties', specialtyRouter);
app.use('/doctors', doctorRouter);

// ERROR HANDLING
// Wildcard * means "match any route"
// Put at the end of route declarations
// to catch anything that does not match an earlier route
app.get('*', (request, response) => {
  console.log(`User tried to visit ${request.path}`);
  response.status(404).json({
    message: 'Page not found. ',
    attemptedPath: request.path,
  });
});

// Error handling catcher
// applies to every route in the server by using .use
app.use((error, request, response) => {
  console.log('Error occurred in the server.');
  console.log(JSON.stringify(error));
  response.json({
    message: error.message,
  });
});

app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);
  await mongoose.connect('mongodb://127.0.0.1:27017/book_a_doc_db');
  console.log('Database connected');
});

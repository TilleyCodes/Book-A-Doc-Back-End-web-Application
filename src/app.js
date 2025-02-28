/* eslint-disable no-underscore-dangle */
// app file for testing purposes only
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { errorHandler, globalErrorHandler } = require('./middleware/errorHandler');

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

// Routes for patients testing
app.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/patients/:patientId', async (req, res) => {
  try {
    const { patientId } = req.params;
    const patients = await Patient.find();
    // eslint-disable-next-line no-underscore-dangle
    const patient = patients.find((p) => p._id === patientId);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    return res.status(200).json([patient]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.post('/patients', errorHandler(async (req, res) => {
  const newPatient = await Patient.create();
  return res.status(200).json(newPatient);
}));

app.patch('/patients/:patientId', errorHandler(async (req, res) => {
  const { patientId } = req.params;
  const updatedPatient = await Patient.findByIdAndUpdate(
    patientId,
    req.body,
    { new: true, runValidators: true },
  );
  if (!updatedPatient) {
    return res.status(404).json({ error: `Patient with id: ${patientId} does not exist.` });
  }
  return res.status(200).json(updatedPatient);
}));

app.delete('/patients/:patientId', errorHandler(async (req, res) => {
  const { patientId } = req.params;
  const deletedPatient = await Patient.findByIdAndDelete(patientId);
  if (!deletedPatient) {
    return res.status(404).json({ error: `Patient with id: ${patientId} does not exist.` });
  }
  return res.status(200).json(deletedPatient);
}));

// Testing routes for medical centres
app.get('/medicalCentres', async (req, res) => {
  try {
    const centres = await MedicalCentre.find();
    res.status(200).json(centres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/medicalCentres/:medicalCentreId', async (req, res) => {
  try {
    const { medicalCentreId } = req.params;
    const centre = await MedicalCentre.findById(medicalCentreId);

    if (!centre) {
      return res.status(404).json({ message: 'Medical centre not found' });
    }

    return res.status(200).json(centre);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.post('/medicalCentres', errorHandler(async (req, res) => {
  const newCentre = await MedicalCentre.create(req.body);
  return res.status(201).json(newCentre);
}));

app.patch('/medicalCentres/:medicalCentreId', errorHandler(async (req, res) => {
  const { medicalCentreId } = req.params;
  const updatedCentre = await MedicalCentre.findByIdAndUpdate(
    medicalCentreId,
    req.body,
    { new: true, runValidators: true },
  );

  if (!updatedCentre) {
    return res.status(404).json({ error: `Medical centre with id: ${medicalCentreId} does not exist.` });
  }

  return res.status(200).json(updatedCentre);
}));

app.delete('/medicalCentres/:medicalCentreId', errorHandler(async (req, res) => {
  const { medicalCentreId } = req.params;
  const deletedCentre = await MedicalCentre.findByIdAndDelete(medicalCentreId);

  if (!deletedCentre) {
    return res.status(404).json({ error: `Medical centre with id: ${medicalCentreId} does not exist.` });
  }

  return res.status(200).json(deletedCentre);
}));

// Testing routes for specialties
app.get('/specialties', async (_req, res) => {
  try {
    const specialties = await Specialty.find();
    return res.status(200).json(specialties);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.get('/specialties/:specialtyId', async (req, res) => {
  try {
    const { specialtyId } = req.params;
    const specialty = await Specialty.findById(specialtyId);

    if (!specialty) {
      return res.status(404).json({ message: 'Specialty not found' });
    }

    return res.status(200).json(specialty);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.post('/specialties', errorHandler(async (req, res) => {
  const newSpecialty = await Specialty.create(req.body);
  return res.status(201).json(newSpecialty);
}));

app.patch('/specialties/:specialtyId', errorHandler(async (req, res) => {
  const { specialtyId } = req.params;
  const updatedSpecialty = await Specialty.findByIdAndUpdate(
    specialtyId,
    req.body,
    { new: true, runValidators: true },
  );

  if (!updatedSpecialty) {
    return res.status(404).json({ error: `Specialty with id ${specialtyId} not found` });
  }

  return res.status(200).json(updatedSpecialty);
}));

app.delete('/specialties/:specialtyId', errorHandler(async (req, res) => {
  const { specialtyId } = req.params;
  const deletedSpecialty = await Specialty.findByIdAndDelete(specialtyId);

  if (!deletedSpecialty) {
    return res.status(404).json({ error: `Specialty with id ${specialtyId} not found` });
  }

  return res.status(200).json(deletedSpecialty);
}));

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
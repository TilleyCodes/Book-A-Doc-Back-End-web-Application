const express = require('express');
const {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingController');
const { errorHandler } = require('../middleware/errorHandler');
const auth = require('../middleware/authMiddleware');

const bookingRouter = express.Router();

// Validate booking data middleware
const validateBookingData = (req, res, next) => {
  const { patientId, doctorId, availabilityId, status } = req.body;
  const errors = [];

  if (!patientId) {
    errors.push('Patient ID is required');
  }
  if (!doctorId) {
    errors.push('Doctor ID is required');
  }
  if (!availabilityId) {
    errors.push('Availability ID is required');
  }
  if (status && !['completed', 'confirmed', 'cancelled'].includes(status)) {
    errors.push('Status must be one of: completed, confirmed, cancelled');
  }

  if (errors.length > 0) {
    return res.status(400).json({ 
      status: 'error',
      message: 'Validation failed',
      errors 
    });
  }
  return next();
};


// GET ALL | http://localhost:3000/bookings
bookingRouter.get('/', auth, errorHandler(async (req, res) => {
  const bookings = await getBookings();
  res.status(200).json(bookings);
}));

// GET ONE | http://localhost:3000/bookings/bookingId
bookingRouter.get('/:bookingId', auth, errorHandler(async (req, res) => {
  const booking = await getBooking(req.params.bookingId);
  res.status(200).json(booking);
}));

// CREATE | http://localhost:3000/bookings
bookingRouter.post('/', auth, validateBookingData, errorHandler(async (req, res) => {
  const newBooking = await createBooking(req.body);
  res.status(201).json(newBooking);
}));

// UPDATE | http://localhost:3000/bookings/bookingId
bookingRouter.patch('/:bookingId', auth, errorHandler(async (req, res) => {
  const updatedBooking = await updateBooking(req.params.bookingId, req.body);
  res.status(200).json(updatedBooking);
}));

// DELETE | http://localhost:3000/bookings/bookingId
bookingRouter.delete('/:bookingId', auth, errorHandler(async (req, res) => {
  const deletedBooking = await deleteBooking(req.params.bookingId);
  res.status(200).json(deletedBooking);
}));

module.exports = bookingRouter;
